import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEducacionComponent } from '../modal-educacion/modal-educacion.component';
import { ModalEducacionAddComponent } from '../modal-educacion-add/modal-educacion-add.component';
import { Educacion } from '../../models/educacion.model';
import { Persona } from '../../models/persona.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  miPortfolio: any;
  educacionList:any;
  educacionSelect: any;
  private subscription!: Subscription;

  constructor(private servicePortfolio:PortfolioService,
    private modalService: NgbModal,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this.obtenerEducacion();
    this.obtenerPortfolio();
  }

  obtenerPortfolio(){
    this.servicePortfolio.obtenerDatosPersona().subscribe((data: Persona[]) =>{
      this.miPortfolio=data;
        });
  }

  obtenerEducacion(){
    this.subscription = this.servicePortfolio.obtenerDatosEducacion().subscribe((data: Educacion[]) =>{
      this.educacionList=data;
      });
  }

  openModalEducacion(id_educacion: string) {
    const modalRef = this.modalService.open(ModalEducacionComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "Educación"
    this.educacionSelect =this.educacionList.find(x => x.id === id_educacion)

    modalRef.componentInstance.fromParentEducacion = this.educacionSelect;
    modalRef.componentInstance.fromParentTitle = title;

    modalRef.result.then((result) => {
      if(result){
        this.servicePortfolio.actualizarDatosEducacion(result.id, result).subscribe(data => {
          this.educacionSelect.id = data.id;});
        }
      }).catch(() => { /* closed */ });
  }

  openModalEducacionAdd() {
    const modalRef = this.modalService.open(ModalEducacionAddComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "Educación"
    let newEducacion: Educacion = {
      "persona": 1,
      "image_educacion":'https://yoprogramo-tnmorenoadrian.koyeb.app/get/image/default.png',
	    "titulo_educacion": '',
	    "info_educacion": '',
	    "desde_educacion": '',
	    "hasta_educacion": ''
    };

    modalRef.componentInstance.fromParentEducacion = newEducacion;
    modalRef.componentInstance.fromParentIdPersona = this.miPortfolio.id;
    modalRef.componentInstance.fromParentTitle = title;
    
    modalRef.result.then((result) => {
      if (result) {
        this.servicePortfolio.addEducacion(result).subscribe(()=>{
          if(this.subscription) this.subscription.unsubscribe();
          this.obtenerEducacion();
        });
        }
      }).catch(() => { /* closed */ });
  }

  borrarEducacion(id_educacion: string) {
    this.servicePortfolio.borrarEducacion(id_educacion).subscribe(()=>{
      if(this.subscription) this.subscription.unsubscribe();
      this.obtenerEducacion(); 
  });
  }
  
}

