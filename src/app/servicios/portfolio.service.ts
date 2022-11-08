import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {Persona} from '../models/persona.model';
import {Experiencia} from '../models/experiencia.model';
import {Educacion} from '../models/educacion.model'

@Injectable({
  providedIn: 'root'
})

export class PortfolioService {

  apiUrl: string = 'http://localhost:8081';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http:HttpClient) { }

  /*ObtenerDatos():Observable<any>{
   return this.http.get('./assets/data/data.json')
  }
  */
   obtenerDatosPersona():Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.apiUrl}`+"/persona/1")
   }

   obtenerDatosExperiencia():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.apiUrl}`+"/experiencia/1")
   }
   
   obtenerDatosEducacion():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.apiUrl}`+"/educacion/1")
   }
   
   obtenerDatosProyecto():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.apiUrl}`+"/proyecto/1")
   } 

  actualizarDatos(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  actualizarDatosExperiencia(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/update/experiencia/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  actualizarDatosEducacion(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/update/educacion/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  actualizarDatosProyecto(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/update/proyecto/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  addExperiencia(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/new/experiencia`;
    return this.http.post(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  addEducacion(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/new/educacion`;
    return this.http.post(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  addProyecto(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/new/proyecto`;
    return this.http.post(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  borrarExperiencia(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/delete/experiencia/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.handleError)
    )
  }

  borrarEducacion(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/delete/educacion/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.handleError)
    )
  }

  borrarProyecto(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/delete/proyecto/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }

}
