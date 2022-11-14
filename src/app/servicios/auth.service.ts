import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  uri= 'http://localhost:8081';
  token:any;
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient, private router: Router) { }

  logIn(credenciales)  {
    return this.http.post<any>(this.uri + '/authenticate', JSON.stringify( credenciales ), { headers: this.headers })
    .pipe(
      map(resp => {
      localStorage.setItem('username', credenciales.username);
      let tokenStr = "Bearer " + resp.jwt;
      localStorage.setItem('token', tokenStr);
      this.router.navigate(['portfolio']);
      console.log(localStorage.getItem('token'))
    })
    );
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