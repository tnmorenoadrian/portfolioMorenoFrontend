import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../servicios/portfolio.service';
import { AuthService } from '../../servicios/auth.service';
import {Persona} from '../../models/persona.model'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalImgFondoComponent } from '../modal-img-fondo/modal-img-fondo.component';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  miPortfolio: any;

  constructor(private datosPortfolio:PortfolioService,
              public authService: AuthService,
              private modalService: NgbModal
              )
             {}            

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosPersona().subscribe((data: Persona[]) =>{
    this.miPortfolio=data;
    }); 
  }
   
  logout() {
    console.log("you are logout")
    this.authService.logout() 
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
          this.miPortfolio.id = data.id;});
        }
      }).catch(() => { /* closed */ });
    }

}
