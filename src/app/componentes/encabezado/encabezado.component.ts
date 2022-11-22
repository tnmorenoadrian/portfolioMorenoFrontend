import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../servicios/portfolio.service';
import { AuthService } from '../../servicios/auth.service';
import {Persona} from '../../models/persona.model'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from '../modal-login/modal-login.component';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  miPortfolio: any;
  styles: any;

  constructor(private datosPortfolio:PortfolioService,
              public authService: AuthService,
              private modalService: NgbModal
              )
             {}            

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosPersona().subscribe((data: Persona[]) =>{
    this.miPortfolio=data
    });  
  }

   
  logout() {
    console.log("you are logout")
    this.authService.logOut() 
    }

    

    openModalLogin() {
      const modalRef = this.modalService.open(ModalLoginComponent,
        {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          size: 'sm',
          // keyboard: false,
          // backdrop: 'static'
        });
    }

}
