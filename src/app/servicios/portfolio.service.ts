import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {Persona} from '../../persona.model'

@Injectable({
  providedIn: 'root'
})

export class PortfolioService {

  apiUrl: string = 'http://localhost:3000/todos';
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http:HttpClient) { }

  /*ObtenerDatos():Observable<any>{
   return this.http.get('./assets/data/data.json')
  }
  */
  ObtenerDatos():Observable<any>{
    return this.http.get('./assets/data/data.json')
   }

  ActualizarDatos(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  BorrarDatos(id: any): Observable<any> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }

}
