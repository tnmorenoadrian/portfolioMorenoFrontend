import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../../componentes/modal/modal.component';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  miPortfolio:any;

  constructor(private datosPortfolio:PortfolioService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.datosPortfolio.ObtenerDatos().subscribe(data =>{
      this.miPortfolio=data;
      });
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });

    let title = "Acerca de"
    let data = this.miPortfolio.acercaInfo

    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.fromParentTitle = title;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

}
