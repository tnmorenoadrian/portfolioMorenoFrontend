import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginViewModel } from 'src/app/models/login.model';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  username = '';
  password = '';

  
   
  constructor(private authService: AuthService,
    public activeModal: NgbActiveModal
    ) {
     
  }
  login() {
  let newLogin: LoginViewModel = {
    "username": this.username,
    "password": this.password
  };
  this.authService.logIn(newLogin);
  
  this.activeModal.close();
  }

  ngOnInit(): void {
  }

}
