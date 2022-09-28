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
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  AppRoutingModule,
                  MatCardModule,
                  HttpClientModule,
                  MatButtonModule,
                  MatIconModule,
                  MatInputModule,
                  BrowserAnimationsModule 
                 ],
  declarations: [ AppComponent,
                  EncabezadoComponent,
                  AcercaDeComponent,
                  ExperienciaComponent,
                  EducacionComponent,
                  HabilidadesComponent,
                  ProyectosComponent,
                  LoginComponent,
                  MainComponent,
                ],
  providers: [    
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
