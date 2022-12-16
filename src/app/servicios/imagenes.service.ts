import { HttpClient, HttpParams, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { skipApiKey } from './http.context';

@Injectable({
  providedIn: 'root'
})

export class ImagenesService {

  apiUrl: string = 'https://yoprogramo-tnmorenoadrian.koyeb.app/';
  urlPrevImg!: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http:HttpClient) { }

  /*ObtenerDatos():Observable<any>{
   return this.http.get('./assets/data/data.json')
  }
  */
   subirImagen(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

        const options = {
          reportProgress: true,
          observe: 'events'
        };
    const req = new HttpRequest('POST', `${this.apiUrl}`+"/upload/image/", formData, options);
    return this.http.request(req);
  }

  verImagen(urlPrevImg): Observable<Blob> {
    return this.http.get(urlPrevImg, { responseType: 'blob', context: skipApiKey() });
  }

  buscarImagen(nombre:string):Observable<any>{
    return this.http.get(`${this.apiUrl}`+"/buscar/image/"+nombre)
   }

}

