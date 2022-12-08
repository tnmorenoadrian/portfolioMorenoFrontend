import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-modal-acerca-de',
  templateUrl: './modal-acerca-de.component.html',
  styleUrls: ['./modal-acerca-de.component.css']
})
export class ModalAcercaDeComponent implements OnInit {

  @Input() fromParentTitle:any;
  @Input() fromParentPersona:any;
  @Output() datosEdit: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private servicePortfolio:PortfolioService
  ) { }

  ngOnInit() {
  }
  
  actualizar() {
    this.datosEdit.emit(this.fromParentPersona); 
    this.activeModal.close(this.fromParentPersona);
    }
}
