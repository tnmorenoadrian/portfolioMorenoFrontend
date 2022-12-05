import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {Persona} from '../models/persona.model';
import {Experiencia} from '../models/experiencia.model';
import {Educacion} from '../models/educacion.model';
import {Proyecto} from '../models/proyecto.model';
import {Habilidad} from '../models/habilidad.model'
import { skipApiKey } from './http.context';

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
    return this.http.get<Persona[]>(`${this.apiUrl}`+"/open/persona/1", { context: skipApiKey() });
   }

   obtenerDatosExperiencia():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.apiUrl}`+"/open/experiencias/1", { context: skipApiKey() });
   }
   
   obtenerDatosEducacion():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.apiUrl}`+"/open/educacion/1", { context: skipApiKey() });
   }

   obtenerDatosHabilidades():Observable<Educacion[]>{
    return this.http.get<Habilidad[]>(`${this.apiUrl}`+"/open/habilidades/1", { context: skipApiKey() });
   }
   
   obtenerDatosProyecto():Observable<Educacion[]>{
    return this.http.get<Proyecto[]>(`${this.apiUrl}`+"/open/proyectos/1", { context: skipApiKey() });
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

  actualizarDatosHabilidades(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/update/habilidad/${id}`;
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

  borrarHabilidad(id: any): Observable<any> {
    let API_URL = `${this.apiUrl}/delete/habilidad/${id}`;
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
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
 }

}
