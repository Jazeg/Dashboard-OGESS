import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

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

  // Método para consultar indicador8_i
  getIndicador8_I(anioEspecifico: string): Observable<{ resultado_final: number }> {
    return this.http.get<{ resultado_final: number }>(`${this.apiUrl}/indicador8_i/${anioEspecifico}`);
  }

  // Método para consultar indicador8_ii
  getIndicador8(anioEspecifico: string): Observable<{ resultado_final: number }> {
    return this.http.get<{ resultado_final: number }>(`${this.apiUrl}/indicador8_ii/${anioEspecifico}`);
  }


  // Método para consultar indicador8_iii
  getIndicador8_III(anioEspecifico: string): Observable<{ resultado_final: number }> {
    return this.http.get<{ resultado_final: number }>(`${this.apiUrl}/indicador8_iii/${anioEspecifico}`);
  }

  // Método para consultar indicador8_iv
  getIndicador8_IV(anioEspecifico: string): Observable<{ resultado_final: number }> {
    return this.http.get<{ resultado_final: number }>(`${this.apiUrl}/indicador8_iv/${anioEspecifico}`);
  }

    // GET all indicators
    getAllIndicadores(): Observable<any> {
      return this.http.get(`${this.apiUrl}/indicador`);
    }
  
    // POST create new indicator
    createIndicador(indicadorData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/indicador`, indicadorData);
    }
  
    // GET indicator by number
    getIndicadorPorNumero(num: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/indicador/${num}`);
    }
  
    // PUT update indicator
    updateIndicador(id: string, indicadorData: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/indicador/${id}`, indicadorData);
    }
  
    // DELETE indicator
    deleteIndicador(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/indicador/${id}`);
    }
 
    getAllComponentes(): Observable<any> {
      return this.http.get(`${this.apiUrl}/componente`);
    }
  
    createComponente(componenteData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/componente`, componenteData);
    }
  
    getComponentePorId(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/componente/${id}`).pipe(
        catchError(this.handleError)
      );
    }
  
    updateComponente(id: string, componenteData: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/componente/${id}`, componenteData);
    }
  
    deleteComponente(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/componente/${id}`).pipe(
        tap(() => console.log(`Componente con id ${id} eliminado del servidor`))
      );
    }

    private handleError(error: HttpErrorResponse) {
      console.error('An error occurred:', error);
      return throwError('Algo salió mal. Por favor, inténtelo de nuevo más tarde.');
    }
  
    
    getIndicadorPorComponente(id_componente: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/indicadorcomponente/${id_componente}`);
    }

    getAllHistory(): Observable<any> {
      return this.http.get(`${this.apiUrl}/history`);
    }
    
    getSoloHistory(anio: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/history/${anio}`);
    }

}
