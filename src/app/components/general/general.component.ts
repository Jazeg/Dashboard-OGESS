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
      this.uploadedFiles.forEach((file, index) => {
        formData.append(`file${index + 1}`, file, file.name);
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
          alert('Error al cargar los archivos');
          this.isUploading = false;
        }
      );
    }
  }
}