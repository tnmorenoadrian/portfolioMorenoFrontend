import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalLoginComponent } from './componentes/modal-login/modal-login.component';
import { MainComponent } from './componentes/main/main.component';

const routes: Routes = [
  
{path: '', redirectTo: 'portfolio', pathMatch: 'full'},  
{path: 'portfolio', component: MainComponent},
{path: 'portfolio-edit', component: MainComponent}

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }