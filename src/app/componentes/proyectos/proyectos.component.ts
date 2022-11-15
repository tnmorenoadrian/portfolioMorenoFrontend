import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProyectosComponent } from '../modal-proyectos/modal-proyectos.component';
import { ModalProyectosAddComponent } from '../modal-proyectos-add/modal-proyectos-add.component';
import { Proyecto } from '../../models/proyecto.model';
import { Persona } from '../../models/persona.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  miPortfolio: any;
  proyectosList:any;
  proyectoSelect: any;
  private subscription!: Subscription;

  constructor(private datosPortfolio:PortfolioService,
    private modalService: NgbModal,
    public authService: AuthService
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

    let title = "Proyectos"
    this.proyectoSelect =this.proyectosList.find(x => x.id === id_proyecto)

    modalRef.componentInstance.fromParentProyecto = this.proyectoSelect;
    modalRef.componentInstance.fromParentTitle = title;

    modalRef.result.then((result) => {
      if(result){
        this.datosPortfolio.actualizarDatosProyecto(result.id, result).subscribe(data => {
          this.proyectoSelect.id = data.id;});
        }
      }).catch(() => { /* closed */ });
  }

  openModalProyectoAdd() {
    const modalRef = this.modalService.open(ModalProyectosAddComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "PROYECTOS"
    let newProyecto: Proyecto = {
      "persona": 1,
      "image_proyecto":'http://localhost:8081/get/image/default.png',
	    "titulo_proyecto": '',
	    "info_proyecto": '',
	    "desde_proyecto": '',
	    "hasta_proyecto": ''
    };

    modalRef.componentInstance.fromParentProyecto = newProyecto;
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

