import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalImgFondoComponent } from './componentes/modal-img-fondo/modal-img-fondo.component';
import { Persona } from './models/persona.model';
import { AuthService } from './servicios/auth.service';
import { PortfolioService } from './servicios/portfolio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'portfolioMorenoFrontend';
  miPortfolio: any;
  styles: any;

  constructor(private servicePortfolio:PortfolioService,
    private modalService: NgbModal,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.servicePortfolio.obtenerDatosPersona().subscribe((data: Persona[]) =>{
    this.miPortfolio=data;
    this.showImgBack(); 
    });
    
  }

  showImgBack(){
    const bgImageUrl = this.miPortfolio.image_background;
    this.styles = {
    backgroundImage: `url(${bgImageUrl})`,
    
       };  
  }

  openModalImgFondo() {
    const modalRef = this.modalService.open(ModalImgFondoComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });

    let title = "Imagen de fondo"
    let datos_persona =this.miPortfolio

    modalRef.componentInstance.fromParentPersona = datos_persona;
    modalRef.componentInstance.fromParentTitle = title;
    modalRef.result.then((result) => {
      if(result){
      this.servicePortfolio.actualizarDatos(result.id, result).subscribe((data) => {
        this.miPortfolio.id = data.id;
        this.showImgBack(); 
      });
      }
    }).catch(() => { /* closed */ });
  }
   

}
