import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent {
  uploadedFiles: File[] = [];
  isUploading: boolean = false;

  constructor(private dataService: DataService) {}

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