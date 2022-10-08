import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() fromParent:any;
  @Input() fromParentTitle:any;
 

  constructor(
    public activeModal: NgbActiveModal,
    private datosPortfolio:PortfolioService
  ) { }

  ngOnInit() {
    console.log(this.fromParent);
    /* Output:
     {prop1: "Some Data", prop2: "From Parent Component", prop3: "This Can be anything"}
    */
  }

  closeModal(sendData:any) {
    this.activeModal.close(sendData);
  }

  actualizar(datosNuevos: any){ 
    this.datosPortfolio.ActualizarDatos(datosNuevos.id,datosNuevos).subscribe((response)=>{
      this.fromParent;
    },(error=>{

    }));
  }

}
