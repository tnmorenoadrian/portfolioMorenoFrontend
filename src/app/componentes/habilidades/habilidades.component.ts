import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHabilidadesComponent } from '../modal-habilidades/modal-habilidades.component';
import { Experiencia } from '../../models/experiencia.model';
import { Persona } from 'src/app/models/persona.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

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

  constructor(private datosPortfolio:PortfolioService,
    private modalService: NgbModal,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this.actualizarHabilidades();
    this.actualizarPortfolio();
  }

  actualizarPortfolio(){
    this.datosPortfolio.obtenerDatosPersona().subscribe((data: Persona[]) =>{
      this.miPortfolio=data;
        });
  }

  actualizarHabilidades(){
    this.subscription = this.datosPortfolio.obtenerDatosHabilidades().subscribe((data: Experiencia[]) =>{
      this.habilidadesList=data;
      });
  }

  openModalHabilidades(id_experiencia: string) {
    const modalRef = this.modalService.open(ModalHabilidadesComponent,
      {
        windowClass: 'modal-xl'
      });

    let title = "Habilidades"
    this.habilidadesSelect =this.habilidadesList.find(x => x.id === id_experiencia)

    modalRef.componentInstance.fromParentHabilidades = this.habilidadesSelect;
    modalRef.componentInstance.fromParentTitle = title;

    modalRef.result.then((result) => {
      if(result){
        this.datosPortfolio.actualizarDatosHabilidades(result.id, result).subscribe(data => {
          this.habilidadesSelect.id = data.id;});
        }
      }).catch(() => { /* closed */ });
  }


  borrarHabilidad(id_habilidad: string) {
    this.datosPortfolio.borrarHabilidad(id_habilidad).subscribe(()=>{
      if(this.subscription) this.subscription.unsubscribe();
      this.actualizarHabilidades(); 
  });
  }
  

}