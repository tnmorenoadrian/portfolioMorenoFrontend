import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalExperienciaComponent } from '../modal-experiencia/modal-experiencia.component';
import { ModalExperienciaAddComponent } from '../modal-experiencia-add/modal-experiencia-add.component';
import { Experiencia } from '../../models/experiencia.model';
import { Persona } from 'src/app/models/persona.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  miPortfolio: any;
  experienciaList:any;
  experienciaSelect: any;
  private subscription!: Subscription;

  constructor(private servicePortfolio:PortfolioService,
    private modalService: NgbModal,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this.obtenerExperiencia();
    this.obtenerPortfolio();
  }

  obtenerPortfolio(){
    this.servicePortfolio.obtenerDatosPersona().subscribe((data: Persona[]) =>{
      this.miPortfolio=data;
        });
  }

  obtenerExperiencia(){
    this.subscription = this.servicePortfolio.obtenerDatosExperiencia().subscribe((data: Experiencia[]) =>{
      this.experienciaList=data;
      });
  }

  openModalExperiencia(id_experiencia: string) {
    const modalRef = this.modalService.open(ModalExperienciaComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "Experiencia"
    this.experienciaSelect =this.experienciaList.find(x => x.id === id_experiencia)

    modalRef.componentInstance.fromParentExperiencia = this.experienciaSelect;
    modalRef.componentInstance.fromParentTitle = title;

    modalRef.result.then((result) => {
      if(result){
        this.servicePortfolio.actualizarDatosExperiencia(result.id, result).subscribe(data => {
          this.experienciaSelect.id = data.id;});
        }
      }).catch(() => { /* closed */ });
  }

  openModalExperienciaAdd() {
    const modalRef = this.modalService.open(ModalExperienciaAddComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "Experiencia"
    let newExperiencia: Experiencia = {
      "persona": 1,
      "image_experiencia":'https://yoprogramo-tnmorenoadrian.koyeb.app/get/image/default.png',
	    "titulo_experiencia": '',
	    "info_experiencia": '',
	    "desde_experiencia": '',
	    "hasta_experiencia": ''
    };

    modalRef.componentInstance.fromParentExperiencia = newExperiencia;
    modalRef.componentInstance.fromParentIdPersona = this.miPortfolio.id;
    modalRef.componentInstance.fromParentTitle = title;
    
    modalRef.result.then((result) => {
      if (result) {
        this.servicePortfolio.addExperiencia(result).subscribe(()=>{
          if(this.subscription) this.subscription.unsubscribe();
          this.obtenerExperiencia();
        });
        }
      }).catch(() => { /* closed */ });
  }

  borrarExperiencia(id_experiencia: string) {
    this.servicePortfolio.borrarExperiencia(id_experiencia).subscribe(()=>{
      if(this.subscription) this.subscription.unsubscribe();
      this.obtenerExperiencia(); 
  });
  }
  

}
