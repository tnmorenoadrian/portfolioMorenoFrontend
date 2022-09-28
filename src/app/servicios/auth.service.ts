import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  uri= 'http://localhost:3000/api';
  token:any;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    this.http.post(this.uri + '/authenticate',{email: email, password: password})
    .subscribe((resp: any) => {
      localStorage.setItem('token', resp.token);
      this.router.navigate(['portfolio']);
    });
  }

  logout() {
    localStorage.removeItem('token');
  }
   
  public get logIn(): boolean {
    return(localStorage.getItem('token') !== null);
    //const token = localStorage.getItem('token');
    //console.log(token);
    //return false;
  }

}