import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../servicios/portfolio.service';
import { LoginComponent } from '../../componentes/login/login.component';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  miPortfolio:any;

  constructor(private datosPortfolio:PortfolioService
              
              )
             { }

  ngOnInit(): void {
    this.datosPortfolio.ObtenerDatos().subscribe(data =>{
    this.miPortfolio=data;
    });
  
  }

}
