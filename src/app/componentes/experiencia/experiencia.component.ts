import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalExperienciaComponent } from '../modal-experiencia/modal-experiencia.component';
import { Experiencia } from '../../models/experiencia.model';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  miPortfolio: any;
  experienciaList:any;
  experienciaSelect: any;

  constructor(private datosPortfolio:PortfolioService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosExperiencia().subscribe((data: Experiencia[]) =>{
      this.experienciaList=data;
      });
  }

  openModalExperiencia(id_experiencia: string) {
    const modalRef = this.modalService.open(ModalExperienciaComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "EXPERIENCIA"
    this.experienciaSelect =this.experienciaList.find(x => x.id === id_experiencia)

    modalRef.componentInstance.fromParentExperiencia = this.experienciaSelect;
    modalRef.componentInstance.fromParentTitle = title;

    modalRef.result.then((result) => {
      if(result){
        this.datosPortfolio.actualizarDatosExperiencia(result.id, result).subscribe((data) => {
          this.experienciaSelect.id = data.id;});
        }
      }).catch(() => { /* closed */ });
  }

}
