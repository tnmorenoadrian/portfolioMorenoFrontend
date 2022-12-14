import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAcercaDeComponent } from '../modal-acerca-de/modal-acerca-de.component';
import { ModalPerfilComponent } from '../modal-perfil/modal-perfil.component';
import { ModalImgPerfilComponent } from '../modal-img-perfil/modal-img-perfil.component';
import { Persona } from '../../models/persona.model';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  miPortfolio: any;

  constructor(private servicePortfolio:PortfolioService,
     private modalService: NgbModal,
     public authService: AuthService) { 
  }

  ngOnInit(): void {
    this.servicePortfolio.obtenerDatosPersona().subscribe((data: Persona[]) =>{
      this.miPortfolio=data;
    
        });
  }

  openModalSobreMi() {
    const modalRef = this.modalService.open(ModalAcercaDeComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });

    let title = "Sobre mi"
    let datos_persona =this.miPortfolio

    modalRef.componentInstance.fromParentPersona = datos_persona;
    modalRef.componentInstance.fromParentTitle = title;
    modalRef.result.then((result) => {
      if(result){
        this.servicePortfolio.actualizarDatos(result.id, result).subscribe((data) => {
          this.miPortfolio.id = data.id;});
        }
      }).catch(() => { /* closed */ });
  }

  openModalPerfil() {
    const modalRef = this.modalService.open(ModalPerfilComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });

    let title = "Información Personal"
    let datos_persona =this.miPortfolio

    modalRef.componentInstance.fromParentPersona = datos_persona;
    modalRef.componentInstance.fromParentTitle = title;
    modalRef.result.then((result) => {
      if(result){
        this.servicePortfolio.actualizarDatos(result.id, result).subscribe((data) => {
          this.miPortfolio.id = data.id;});
        }
      }).catch(() => { /* closed */ });
  }

  openModalImgPerfil() {
    const modalRef = this.modalService.open(ModalImgPerfilComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });

    let title = "Imagen de perfil"
    let datos_persona =this.miPortfolio

    modalRef.componentInstance.fromParentPersona = datos_persona;
    modalRef.componentInstance.fromParentTitle = title;
    modalRef.result.then((result) => {
      if(result){
      this.servicePortfolio.actualizarDatos(result.id, result).subscribe((data) => {
        this.miPortfolio.id = data.id;});
      }
    }).catch(() => { /* closed */ });
  }

}
