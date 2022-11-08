import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProyectosComponent } from '../modal-proyectos/modal-proyectos.component';
import { ModalProyectosAddComponent } from '../modal-proyectos-add/modal-proyectos-add.component';
import { Proyecto } from '../../models/proyecto.model';
import { Persona } from '../../models/persona.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  miPortfolio: any;
  proyectosList:any;
  proyectosSelect: any;
  private subscription!: Subscription;

  constructor(private datosPortfolio:PortfolioService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.actualizarProyectos();
    this.actualizarPortfolio();
  }

  actualizarPortfolio(){
    this.datosPortfolio.obtenerDatosPersona().subscribe((data: Persona[]) =>{
      this.miPortfolio=data;
        });
  }

  actualizarProyectos(){
    this.subscription = this.datosPortfolio.obtenerDatosProyecto().subscribe((data: Proyecto[]) =>{
      this.proyectosList=data;
      });
  }

  openModalProyecto(id_proyecto: string) {
    const modalRef = this.modalService.open(ModalProyectosComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "PROYECTOS"
    this.proyectosSelect =this.proyectosList.find(x => x.id === id_proyecto)

    modalRef.componentInstance.fromParentProyectos = this.proyectosSelect;
    modalRef.componentInstance.fromParentTitle = title;

    modalRef.result.then((result) => {
      if(result){
        this.datosPortfolio.actualizarDatosExperiencia(result.id, result).subscribe(data => {
          this.proyectosSelect.id = data.id;});
        }
      }).catch(() => { /* closed */ });
  }

  openModalProyectoAdd() {
    const modalRef = this.modalService.open(ModalProyectosAddComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "PROYECTOS"
    let newProyectos: Proyecto = {
      "persona": 1,
      "image_proyecto":'http://localhost:8081/get/image/default.png',
	    "titulo_proyecto": '',
	    "info_proyecto": '',
	    "desde_proyecto": '',
	    "hasta_proyecto": ''
    };

    modalRef.componentInstance.fromParentProyectos = newProyectos;
    modalRef.componentInstance.fromParentIdPersona = this.miPortfolio.id;
    modalRef.componentInstance.fromParentTitle = title;
    
    modalRef.result.then((result) => {
      if (result) {
        this.datosPortfolio.addProyecto(result).subscribe(()=>{
          if(this.subscription) this.subscription.unsubscribe();
          this.actualizarProyectos();
        });
        }
      }).catch(() => { /* closed */ });
  }

  borrarProyecto(id_proyecto: string) {
    this.datosPortfolio.borrarProyecto(id_proyecto).subscribe(()=>{
      if(this.subscription) this.subscription.unsubscribe();
      this.actualizarProyectos(); 
  });
  }
  
}

