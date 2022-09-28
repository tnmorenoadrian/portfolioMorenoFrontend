import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
   
  constructor(private authService: AuthService) {
     
  }
  login() {
  console.log("you are logging in")
  this.authService.login(this.email, this.password) 
  }

  logout() {
    console.log("you are logging on")
    this.authService.logout() 
    }
 
  ngOnInit() { }
}
