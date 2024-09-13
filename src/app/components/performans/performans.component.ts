import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  nombre_usuario: string;
  correo: string;
  telefono: string;
  direccion: string;
  fecha_nacimiento: string;
  fecha_registro: string;
  genero: string;
  rol: string;
}

@Component({
  selector: 'app-performans',
  templateUrl: './performans.component.html',
  styleUrls: ['./performans.component.css']
})
export class PerformansComponent implements OnInit {
  users: Usuario[] = [];
  error: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Usuarios cargados:', this.users);
      },
      error: (err) => {
        this.error = 'Error al cargar usuarios: ' + err.message;
        console.error('Error:', err);
      }
    });
  }
}