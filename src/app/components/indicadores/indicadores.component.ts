import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';

interface Componente {
  id_componente: number;
  nivel_uno: string;
  nivel_dos: string;
  nivel_tres: string;
  indicadores: Indicador[];
}

interface Indicador {
  id_indicador: number;
  numero_indicador: number;
  nombre_indicador: string;
  numerador: string;
  denominador: string;
  verificador: string;
  param_adec: string;
  valor_adec: string;
  valor_regul_ini: string;
  valor_regul_fin: string;
  valor_defic: string;
  param_defic: string;
  estado: boolean;
  id_componente: number;
}

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndicadoresComponent implements OnInit {
  showComponenteModal = false;
  showIndicadorModal = false;
  componenteForm: FormGroup;
  indicadorForm: FormGroup;
  componentes: Componente[] = [];
  componenteSeleccionado: Componente | null = null;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.componenteForm = this.fb.group({
      nivel_uno: ['', Validators.required],
      nivel_dos: ['', Validators.required],
      nivel_tres: ['', Validators.required]
    });

    this.indicadorForm = this.fb.group({
      numero_indicador: [0, [Validators.required, Validators.min(0)]],
      nombre_indicador: ['', Validators.required],
      numerador: ['', Validators.required],
      denominador: ['', Validators.required],
      verificador: ['', Validators.required],
      param_adec: ['', Validators.required],
      valor_adec: ['', Validators.required],
      valor_regul_ini: ['', Validators.required],
      valor_regul_fin: ['', Validators.required],
      valor_defic: ['', Validators.required],
      param_defic: ['', Validators.required],
      estado: [true, Validators.required]
    });
  }

  ngOnInit() {
    this.cargarComponentes();
  }

  openComponenteModal() {
    this.showComponenteModal = true;
  }

  closeComponenteModal() {
    this.showComponenteModal = false;
    this.componenteForm.reset();
  }

  openIndicadorModal() {
    this.showIndicadorModal = true;
  }

  closeIndicadorModal() {
    this.showIndicadorModal = false;
    this.indicadorForm.reset();
  }

  crearComponente() {
    if (this.componenteForm.valid) {
      this.isLoading = true;
      this.dataService.createComponente(this.componenteForm.value).pipe(
        tap((response) => {
          console.log('Componente creado:', response);
          this.componentes.push(response);
          this.closeComponenteModal();
        }),
        catchError((error) => {
          console.error('Error al crear componente:', error);
          alert('Hubo un error al crear el componente. Por favor, inténtelo de nuevo.');
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      ).subscribe();
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  crearIndicador() {
    if (this.indicadorForm.valid && this.componenteSeleccionado) {
      this.isLoading = true;
      const indicadorData = {
        ...this.indicadorForm.value,
        id_componente: this.componenteSeleccionado.id_componente
      };
      this.dataService.createIndicador(indicadorData).pipe(
        tap((response) => {
          console.log('Indicador creado:', response);
          if (this.componenteSeleccionado) {
            this.componenteSeleccionado.indicadores.push(response);
          }
          this.closeIndicadorModal();
        }),
        catchError((error) => {
          console.error('Error al crear indicador:', error);
          alert('Hubo un error al crear el indicador. Por favor, inténtelo de nuevo.');
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      ).subscribe();
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  cargarComponentes() {
    this.isLoading = true;
    this.dataService.getAllComponentes().pipe(
      tap((componentes: Componente[]) => {
        this.componentes = componentes;
        console.log('Componentes cargados:', this.componentes);
      }),
      catchError((error) => {
        console.error('Error al cargar componentes:', error);
        alert('Hubo un error al cargar los componentes. Por favor, recargue la página.');
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  seleccionarComponente(componente: Componente) {
    this.componenteSeleccionado = componente;
    this.cargarIndicadoresDelComponente(componente.id_componente);
  }

  cargarIndicadoresDelComponente(id_componente: number) {
    this.isLoading = true;
    this.dataService.getIndicadorPorComponente(id_componente.toString()).pipe(
      tap((indicadores: Indicador[]) => {
        if (this.componenteSeleccionado) {
          this.componenteSeleccionado.indicadores = indicadores || [];
        }
        console.log('Indicadores cargados:', indicadores);
      }),
      catchError((error) => {
        console.error('Error al cargar indicadores:', error);
        alert('Hubo un error al cargar los indicadores. Por favor, inténtelo de nuevo.');
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  eliminarComponente(componente: Componente) {
    if (confirm('¿Está seguro de que desea eliminar este componente?')) {
      this.isLoading = true;
      this.dataService.deleteComponente(componente.id_componente.toString()).pipe(
        tap(() => {
          this.componentes = this.componentes.filter(c => c.id_componente !== componente.id_componente);
          if (this.componenteSeleccionado?.id_componente === componente.id_componente) {
            this.componenteSeleccionado = null;
          }
        }),
        catchError((error) => {
          console.error('Error al eliminar componente:', error);
          alert('Hubo un error al eliminar el componente. Por favor, inténtelo de nuevo.');
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      ).subscribe();
    }
  }

  eliminarIndicador(indicador: Indicador) {
    if (confirm('¿Está seguro de que desea eliminar este indicador?')) {
      this.isLoading = true;
      this.dataService.deleteIndicador(indicador.id_indicador.toString()).pipe(
        tap(() => {
          if (this.componenteSeleccionado) {
            this.componenteSeleccionado.indicadores = this.componenteSeleccionado.indicadores.filter(i => i.id_indicador !== indicador.id_indicador);
          }
        }),
        catchError((error) => {
          console.error('Error al eliminar indicador:', error);
          alert('Hubo un error al eliminar el indicador. Por favor, inténtelo de nuevo.');
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      ).subscribe();
    }
  }
}