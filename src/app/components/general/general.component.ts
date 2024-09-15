import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

interface IndicadorData {
  id: number;
  indicador: string;
  numerador: string;
  denominador: string;
  verificador: string;
  rangoCumplimiento: string;
}

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})

export class GeneralComponent implements OnInit {
  uploadedFiles: File[] = [];
  isUploading: boolean = false;
  indicadores: IndicadorData[] = [];
  anioEspecifico: number = new Date().getFullYear(); 

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.initializeIndicadores();
  }
  initializeIndicadores() {
    this.indicadores = [
      {
        id: 8,
        indicador: 'RIESGO DE ENFERMAR POR DEPRESION, ANSIEDAD y CONDUCTA SUICIDA',
        numerador: 'N° de Casos de Depresión, Ansiedad y Conducta Suicida',
        denominador: 'Poblacion Total x 1000',
        verificador: 'HIS',
        rangoCumplimiento: 'No disponible'
      }
    ];
  }

  consultarIndicador() {
    if (!this.anioEspecifico) {
      alert('Por favor, ingrese un año válido');
      return;
    }

    this.indicadores[0].rangoCumplimiento = 'Consultando...';
    
    this.dataService.getIndicador8(this.anioEspecifico.toString()).subscribe(
      (data: { resultado_final: number }) => {
        this.indicadores[0].rangoCumplimiento = data.resultado_final.toFixed(2); // Redondeamos a 2 decimales
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener rangos de cumplimiento', error);
        this.indicadores[0].rangoCumplimiento = 'Error al consultar';
      }
    );
  }

  getRangoClass(valor: string): string {
    const numericValue = parseFloat(valor);
    if (isNaN(numericValue)) {
      return '';
    }
    if (numericValue <= 5.00) {
      return 'rango-bajo';
    } else if (numericValue <= 9.99) {
      return 'rango-medio';
    } else {
      return 'rango-alto';
    }
  }


  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      for (let i = 0; i < files.length && this.uploadedFiles.length < 2; i++) {
        this.uploadedFiles.push(files[i]);
      }
    }
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  uploadFiles() {
    if (this.uploadedFiles.length > 0 && this.uploadedFiles.length <= 2) {
      this.isUploading = true;
      
      // Crear un FormData object para enviar los archivos
      const formData = new FormData();
      
      // Cambio clave: usar 'file' como nombre del campo para todos los archivos
      this.uploadedFiles.forEach((file, index) => {
        formData.append('file', file, file.name);
      });
  
      // Log para verificar el contenido del FormData
      formData.forEach((value, key) => {
        console.log(key, value);
      });
  
      // Llamar al método de tu servicio de datos para subir archivos
      this.dataService.uploadFiles(formData).subscribe(
        response => {
          console.log('Files uploaded successfully', response);
          alert('Archivos cargados con éxito');
          this.uploadedFiles = []; // Limpiar la lista después de cargar
          this.isUploading = false;
        },
        error => {
          console.error('Error uploading files', error);
          if (error.error && error.error.detail) {
            console.error('Error details:', error.error.detail);
          }
          alert('Error al cargar los archivos: ' + (error.error?.detail?.[0]?.msg || error.message));
          this.isUploading = false;
        }
      );
    } else {
      alert('Por favor, selecciona entre 1 y 2 archivos.');
    }
  }
}