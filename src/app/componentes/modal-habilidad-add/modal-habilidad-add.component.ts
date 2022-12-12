import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-habilidad-add',
  templateUrl: './modal-habilidad-add.component.html',
  styleUrls: ['./modal-habilidad-add.component.css']
})
export class ModalHabilidadAddComponent implements OnInit {

  @Input() fromParentTitle:any;
  @Input() fromParentHabilidad:any;
  @Output() datosEdit: EventEmitter<any> = new EventEmitter();
 
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }
  
  agregar() {
    this.datosEdit.emit(this.fromParentHabilidad); 
    this.activeModal.close(this.fromParentHabilidad);
    }

}
