import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  uri= 'https://yoprogramo-tnmorenoadrian.koyeb.app/';
  token:any;
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient, private router: Router) { }

  logIn(credenciales:any)  {
    console.log(JSON.stringify( credenciales ))
    return this.http.post<any>(this.uri + '/login', JSON.stringify( credenciales ),{ observe: 'response'})
    .pipe(map((response) => {
        console.log(response.headers.get("Authorization"));
        localStorage.setItem('username', credenciales.username);
        this.token = response.headers.get("Authorization");
        localStorage.setItem('token', this.token);
        this.router.navigate(['portfolio-edit']);
      }));
  }



  getToken() {
    return localStorage.getItem('token');
  }

  public get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }

  logOut() {
    localStorage.removeItem('token');
  }
   
  //public get logIn(): boolean {
  //  return(localStorage.getItem('token') !== null);
    //const token = localStorage.getItem('token');
    //console.log(token);
    //return false;
  //}

}