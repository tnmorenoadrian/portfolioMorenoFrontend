import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ImagenesService {

  apiUrl: string = 'http://localhost:8081';
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http:HttpClient) { }

  /*ObtenerDatos():Observable<any>{
   return this.http.get('./assets/data/data.json')
  }
  */
   subirImagen(file: File){
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post(`${this.apiUrl}`+"/upload/image/", formData, { observe: 'response' });

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // ver
    return Promise.reject(error.message || error);
 }

}

