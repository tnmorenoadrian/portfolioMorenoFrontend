import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  uri= 'http://localhost:8081';
  token:any;
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient, private router: Router) { }

  logIn(credenciales) {
    return this.http.post(this.uri + '/authenticate', JSON.stringify( credenciales ), { headers: this.headers })
    .subscribe((resp: any) => {
      localStorage.setItem('token', resp.jwt);
      this.router.navigate(['portfolio']);
    });
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