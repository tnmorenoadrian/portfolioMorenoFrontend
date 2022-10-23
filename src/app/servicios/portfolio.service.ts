import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {Persona} from '../models/persona.model'

@Injectable({
  providedIn: 'root'
})

export class PortfolioService {

  apiUrl: string = 'http://localhost:8081';
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http:HttpClient) { }

  /*ObtenerDatos():Observable<any>{
   return this.http.get('./assets/data/data.json')
  }
  */
  obtenerDatos():Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.apiUrl}`+"/persona/1")
   }

  actualizarDatos(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  borrarDatos(id: any): Observable<any> {
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
