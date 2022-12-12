import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-habilidades',
  templateUrl: './modal-habilidades.component.html',
  styleUrls: ['./modal-habilidades.component.css']
})
export class ModalHabilidadesComponent implements OnInit {

  @Input() fromParentTitle:any;
  @Input() fromParentHabilidades:any;
  @Output() datosEdit: EventEmitter<any> = new EventEmitter();
  habilidadSelect: any;
  private subscription!: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private servicePortfolio:PortfolioService
  ) { }

  ngOnInit(): void {
  }

  onChange(id_habilidad: string){
    this.datosEdit.emit(this.fromParentHabilidades);
    this.habilidadSelect = this.fromParentHabilidades.find(x => x.id === id_habilidad);
    this.servicePortfolio.actualizarDatosHabilidades(id_habilidad, this.habilidadSelect).subscribe(data => {
      this.habilidadSelect.id = id_habilidad;});
  }

  borrarHabilidad(id_habilidad: string) {
    this.servicePortfolio.borrarHabilidad(id_habilidad).subscribe(()=>{
      if(this.subscription) this.subscription.unsubscribe();
      this.activeModal.close(this.fromParentHabilidades); 
  });
  
  }

}
