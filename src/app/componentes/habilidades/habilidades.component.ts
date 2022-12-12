import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHabilidadesComponent } from '../modal-habilidades/modal-habilidades.component';
import { Persona } from 'src/app/models/persona.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { Habilidad } from 'src/app/models/habilidad.model';
import { ModalHabilidadAddComponent } from '../modal-habilidad-add/modal-habilidad-add.component';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  miPortfolio: any;
  habilidadesList:any;
  habilidadesSelect: any;
  
  private subscription!: Subscription;

  constructor(private servicePortfolio:PortfolioService,
    private modalService: NgbModal,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this.obtenerHabilidades();
    this.obtenerPortfolio();

  }

  obtenerPortfolio(){
    this.servicePortfolio.obtenerDatosPersona().subscribe((data: Persona[]) =>{
      this.miPortfolio=data;
        });
  }

  obtenerHabilidades(){
    this.subscription = this.servicePortfolio.obtenerDatosHabilidades().subscribe((data: Habilidad[]) =>{
      this.habilidadesList=data;
      });
  }

  openModalHabilidades(id_portfolio: string) {
    const modalRef = this.modalService.open(ModalHabilidadesComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "Habilidades"
    modalRef.componentInstance.fromParentHabilidades = this.habilidadesList;
    modalRef.componentInstance.fromParentTitle = title;

    modalRef.result.then((result) => {
      if(result){
       this.obtenerHabilidades();
        }
      }).catch(() => { /* closed */ });
  }

  openModalHabilidadAdd() {
    const modalRef = this.modalService.open(ModalHabilidadAddComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "Habilidad"
    let newHabilidad: Habilidad = {
      "persona": 1,
	    "programacion_habilidad": '',
	    "idioma_habilidad": '',
	    "nivel_habilidad": ''
    };

    modalRef.componentInstance.fromParentHabilidad = newHabilidad;
    modalRef.componentInstance.fromParentIdPersona = this.miPortfolio.id;
    modalRef.componentInstance.fromParentTitle = title;
    
    modalRef.result.then((result) => {
      if (result) {
        this.servicePortfolio.addHabilidad(result).subscribe(()=>{
          if(this.subscription) this.subscription.unsubscribe();
          this.obtenerHabilidades();
        });
        }
      }).catch(() => { /* closed */ });
  }

}