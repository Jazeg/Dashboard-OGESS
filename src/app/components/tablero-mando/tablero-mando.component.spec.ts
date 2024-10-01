import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
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
  showHistorial?: boolean;
  archivos?: { [key: number]: { nombre: string, archivo: File } };
}

@Component({
  selector: 'app-tablero-mando',
  templateUrl: './tablero-mando.component.html',
  styleUrls: ['./tablero-mando.component.css']
})
export class TableroMandoComponent implements OnInit {
  componentes: Componente[] = [];
  componenteSeleccionado: Componente | null = null;
  indicadoresActivos: Indicador[] = [];
  isLoading = false;
  showModal = false;
  trimestreSeleccionado: number | null = null;
  indicadorSeleccionado: Indicador | null = null;
  archivoSeleccionado: File | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.cargarComponentes();
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

  mostrarIndicadores(componente: Componente) {
    this.componenteSeleccionado = componente;
    this.cargarIndicadoresDelComponente(componente.id_componente);
  }

  cargarIndicadoresDelComponente(id_componente: number) {
    this.isLoading = true;
    this.dataService.getIndicadorPorComponente(id_componente.toString()).pipe(
      tap((indicadores: Indicador[]) => {
        this.indicadoresActivos = indicadores.filter(indicador => indicador.estado).map(indicador => ({
          ...indicador,
          showHistorial: false,
          archivos: {}
        }));
        console.log('Indicadores activos cargados:', this.indicadoresActivos);
      }),
      catchError((error) => {
        console.error('Error al cargar indicadores:', error);
        alert('Hubo un error al cargar los indicadores. Por favor, inténtelo de nuevo.');
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  toggleHistorial(indicador: Indicador) {
    indicador.showHistorial = !indicador.showHistorial;
  }

  abrirModalArchivo(indicador: Indicador, trimestre: number) {
    this.showModal = true;
    this.trimestreSeleccionado = trimestre;
    this.indicadorSeleccionado = indicador;
  }

  cerrarModal() {
    this.showModal = false;
    this.trimestreSeleccionado = null;
    this.indicadorSeleccionado = null;
    this.archivoSeleccionado = null;
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  guardarArchivo() {
    if (this.indicadorSeleccionado && this.trimestreSeleccionado && this.archivoSeleccionado) {
      if (!this.indicadorSeleccionado.archivos) {
        this.indicadorSeleccionado.archivos = {};
      }
      this.indicadorSeleccionado.archivos[this.trimestreSeleccionado] = {
        nombre: this.archivoSeleccionado.name,
        archivo: this.archivoSeleccionado
      };
      
      // Aquí puedes agregar la lógica para enviar el archivo al servidor
      // Por ejemplo:
      // this.dataService.subirArchivo(this.indicadorSeleccionado.id_indicador, this.trimestreSeleccionado, this.archivoSeleccionado).subscribe(
      //   response => {
      //     console.log('Archivo subido exitosamente', response);
      //   },
      //   error => {
      //     console.error('Error al subir archivo', error);
      //   }
      // );

      this.cerrarModal();
    }
  }
}