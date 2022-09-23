import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, MatCardModule ],
  declarations: [ AppComponent, EncabezadoComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
