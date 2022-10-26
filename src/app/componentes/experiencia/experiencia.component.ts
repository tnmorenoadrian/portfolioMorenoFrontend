import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalExperienciaComponent } from '../modal-experiencia/modal-experiencia.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  miPortfolio: any;
  experienciaList:any;

  constructor(private datosPortfolio:PortfolioService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosExperiencia().subscribe(data =>{
      this.experienciaList=data;
      });
  }

  openModalExperiencia() {
    const modalRef = this.modalService.open(ModalExperienciaComponent,
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
        this.datosPortfolio.actualizarDatos(result.id, result).subscribe((data) => {
          this.miPortfolio.id = data.id;});
        }
      }).catch(() => { /* closed */ });
  }

}
