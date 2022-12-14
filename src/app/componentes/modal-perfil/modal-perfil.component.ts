import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.css']
})
export class ModalPerfilComponent implements OnInit {

  @Input() fromParentTitle:any;
  @Input() fromParentPersona:any;
  @Output() datosEdit: EventEmitter<any> = new EventEmitter();
 
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }
  
  actualizar() {
    this.datosEdit.emit(this.fromParentPersona); 
    this.activeModal.close(this.fromParentPersona);
    }

}
