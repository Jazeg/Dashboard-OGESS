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
  historial?: any;
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
  chartData: any;
  chartOptions: any;
  chartType: string = 'line';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.cargarComponentes();
  }

  cargarDatosIndicador(anio: string): void {
    this.dataService.getSoloHistory(anio).subscribe({
      next: (datos) => {
        if (datos.length > 0) {
          this.prepararDatosGrafico(datos[0]);
        } else {
          console.error('No se encontraron datos para el año especificado');
          this.prepararDatosGrafico(null);
        }
      },
      error: (error) => {
        console.error('Error al cargar datos del indicador:', error);
        this.prepararDatosGrafico(null);
      }
    });
  }
  


  prepararDatosGrafico(dato: any | null) {
    const labels = ['Trimestre I', 'Trimestre II', 'Trimestre III', 'Trimestre IV'];
    const datos = dato ? [dato.trim1, dato.trim2, dato.trim3, dato.trim4].map(v => v ? parseFloat(v) : null) : [];
    
    const colores = 'rgba(75, 192, 192, 1)';  // Un solo color para la línea

    this.chartData = {
      labels: labels,
      datasets: [{
        label: `Indicador ${dato?.num_indicador || ''} - Año ${dato?.anio || ''}`,
        data: datos,
        backgroundColor: colores,
        borderColor: colores,
        borderWidth: 2,
        fill: false  // Para que sea una línea sin relleno
      }]
    };

    this.chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 11
        }
      }
    };
    console.log('Datos preparados para el gráfico:', this.chartData);
  }



  get archivosCargados(): number {
    if (this.indicadorSeleccionado && this.indicadorSeleccionado.archivos) {
      return Object.keys(this.indicadorSeleccionado.archivos).length;
    }
    return 0;
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
    if (indicador.showHistorial) {
      if (!indicador.historial) {
        this.cargarHistorialIndicador(indicador);
      }
      // Cargar datos para el gráfico
      const anioActual = new Date().getFullYear().toString();
      this.cargarDatosIndicador(anioActual);
    }
  }

  cargarHistorialIndicador(indicador: Indicador) {
    this.dataService.getAllHistory().pipe(
      tap((historial: any) => {
        indicador.historial = historial;
        console.log('Historial cargado para indicador:', indicador.numero_indicador, historial);
      }),
      catchError((error) => {
        console.error('Error al cargar historial:', error);
        return of(null);
      })
    ).subscribe();
  }

  

  abrirModalArchivo(indicador: Indicador, trimestre: number) {
    if (this.contarArchivosSubidos(indicador) >= 3) {
      alert('Ya se han subido 3 archivos para este indicador. No se pueden subir más.');
      return;
    }
    this.showModal = true;
    this.trimestreSeleccionado = trimestre;
    this.indicadorSeleccionado = indicador;
  }

  getArchivosCargados = (): number => {
    if (this.indicadorSeleccionado && this.indicadorSeleccionado.archivos) {
      return Object.keys(this.indicadorSeleccionado.archivos).length;
    }
    return 0;
  }

  contarArchivosSubidos(indicador: Indicador): number {
    if (!indicador || !indicador.archivos) {
      return 0;
    }
    return Object.keys(indicador.archivos).length;
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
      if (this.contarArchivosSubidos(this.indicadorSeleccionado) >= 3) {
        alert('Ya se han subido 3 archivos para este indicador. No se pueden subir más.');
        this.cerrarModal();
        return;
      }
  
      if (!this.indicadorSeleccionado.archivos) {
        this.indicadorSeleccionado.archivos = {};
      }
      this.indicadorSeleccionado.archivos[this.trimestreSeleccionado] = {
        nombre: this.archivoSeleccionado.name,
        archivo: this.archivoSeleccionado
      };
      
      const formData = new FormData();
      formData.append('file', this.archivoSeleccionado);
      formData.append('indicador_id', this.indicadorSeleccionado.id_indicador.toString());
      formData.append('trimestre', this.trimestreSeleccionado.toString());
  
      this.dataService.uploadFiles(formData).subscribe(
        response => {
          console.log('Archivo subido exitosamente', response);
          // Verificamos que indicadorSeleccionado no sea null antes de llamar al método
          if (this.indicadorSeleccionado) {
            this.cargarHistorialIndicador(this.indicadorSeleccionado);
          } else {
            console.error('Error: indicadorSeleccionado es null');
          }
        },
        error => {
          console.error('Error al subir archivo', error);
        }
      );
  
      this.cerrarModal();
    }
  }
}