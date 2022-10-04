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
  selectedAcerca = null;

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

    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything'
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

}
