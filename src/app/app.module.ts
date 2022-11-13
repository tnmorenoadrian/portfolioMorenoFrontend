import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalAcercaDeComponent } from './componentes/modal-acerca-de/modal-acerca-de.component';
import { ModalPerfilComponent } from './componentes/modal-perfil/modal-perfil.component';
import { ModalImgPerfilComponent } from './componentes/modal-img-perfil/modal-img-perfil.component';
import { ModalImgFondoComponent } from './componentes/modal-img-fondo/modal-img-fondo.component';
import { ModalExperienciaComponent } from './componentes/modal-experiencia/modal-experiencia.component';
import { ModalExperienciaAddComponent } from './componentes/modal-experiencia-add/modal-experiencia-add.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalEducacionComponent } from './componentes/modal-educacion/modal-educacion.component';
import { ModalEducacionAddComponent } from './componentes/modal-educacion-add/modal-educacion-add.component';
import { ModalProyectosComponent } from './componentes/modal-proyectos/modal-proyectos.component';
import { ModalProyectosAddComponent } from './componentes/modal-proyectos-add/modal-proyectos-add.component';
import { ModalLoginComponent } from './componentes/modal-login/modal-login.component';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  AppRoutingModule,
                  MatCardModule,
                  HttpClientModule,
                  MatButtonModule,
                  MatIconModule,
                  MatInputModule,
                  BrowserAnimationsModule,
                  NgbModule,
                  MatFormFieldModule,
                  MatDatepickerModule,
                  MatNativeDateModule,
                  ReactiveFormsModule,
                  MatInputModule 
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
                  ModalAcercaDeComponent,
                  ModalPerfilComponent,
                  ModalImgPerfilComponent,
                  ModalImgFondoComponent,
                  ModalExperienciaComponent,
                  ModalExperienciaAddComponent,
                  ModalEducacionComponent,
                  ModalEducacionAddComponent,
                  ModalProyectosComponent,
                  ModalProyectosAddComponent,
                  ModalLoginComponent
                ],
  providers: [   
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
