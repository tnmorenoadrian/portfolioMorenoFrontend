import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../servicios/portfolio.service';
import { AuthService } from '../../servicios/auth.service';
import {Persona} from '../../models/persona.model'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalImgFondoComponent } from '../modal-img-fondo/modal-img-fondo.component';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import AOS from "aos";


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
    this.miPortfolio=data;
    this.showImgBack(); 
    });
    AOS.init();
    
  }

  showImgBack(){
    const bgImageUrl = this.miPortfolio.image_background;
    this.styles = {
    backgroundImage: `url(${bgImageUrl})`
       };  
  }
   
  logout() {
    console.log("you are logout")
    this.authService.logOut() 
    }

    openModalImgFondo() {
      const modalRef = this.modalService.open(ModalImgFondoComponent,
        {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          // keyboard: false,
          // backdrop: 'static'
        });
  
      let title = "Imagen de fondo"
      let datos_persona =this.miPortfolio
  
      modalRef.componentInstance.fromParentPersona = datos_persona;
      modalRef.componentInstance.fromParentTitle = title;
      modalRef.result.then((result) => {
        if(result){
        this.datosPortfolio.actualizarDatos(result.id, result).subscribe((data) => {
          this.miPortfolio.id = data.id;
          this.showImgBack(); 
        });
        }
      }).catch(() => { /* closed */ });
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
