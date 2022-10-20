import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-modal-img-perfil',
  templateUrl: './modal-img-perfil.component.html',
  styleUrls: ['./modal-img-perfil.component.css']
})
export class ModalImgPerfilComponent implements OnInit {

  @Input() fromParentTitle:any;
  @Input() fromParentPersona:any;
  @Output() datosEdit: EventEmitter<any> = new EventEmitter();
 

  constructor(
    public activeModal: NgbActiveModal,
    private datosPortfolio:PortfolioService
  ) { }

  ngOnInit() {
  }
  
  actualizar() {
    this.datosEdit.emit(this.fromParentPersona); 
    this.activeModal.close(this.fromParentPersona);
    }


}
