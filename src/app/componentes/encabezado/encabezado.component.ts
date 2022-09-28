import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../servicios/portfolio.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  miPortfolio:any;

  constructor(private datosPortfolio:PortfolioService,
              public authService: AuthService
              )
             { }

  ngOnInit(): void {
    this.datosPortfolio.ObtenerDatos().subscribe(data =>{
    this.miPortfolio=data;
    }); 
  }
   
  logout() {
    console.log("you are logout")
    this.authService.logout() 
    }

}
