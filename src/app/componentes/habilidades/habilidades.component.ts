import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHabilidadesComponent } from '../modal-habilidades/modal-habilidades.component';
import { Persona } from 'src/app/models/persona.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { Habilidad } from 'src/app/models/habilidad.model';

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
      },(error) =>{
        this.obtenerHabilidades();
      });
  }


  borrarHabilidad(id_habilidad: string) {
    this.servicePortfolio.borrarHabilidad(id_habilidad).subscribe(()=>{
      if(this.subscription) this.subscription.unsubscribe();
      this.obtenerHabilidades(); 
  });
  }
  

}