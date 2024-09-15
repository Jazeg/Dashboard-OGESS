import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '/api'; 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario`);
  }
  uploadFiles(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload_nominal/`, formData);
  }

  getIndicador8(anioEspecifico: string): Observable<{ resultado_final: number }> {
    return this.http.get<{ resultado_final: number }>(`${this.apiUrl}/indicador8_ii/${anioEspecifico}`);
  }
}