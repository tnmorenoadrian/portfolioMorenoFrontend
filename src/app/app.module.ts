import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, MatCardModule, HttpClientModule ],
  declarations: [ AppComponent, EncabezadoComponent, AcercaDeComponent, ExperienciaComponent, EducacionComponent, HabilidadesComponent, ProyectosComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
