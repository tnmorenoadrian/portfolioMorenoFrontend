import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { LoginModalComponent } from './componentes/login-modal/login-modal.component';
import { MainComponent } from './componentes/main/main.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'login-modal', component: LoginModalComponent},
  {path: '', component: MainComponent,
    children: [
      { path: 'portfolio', component: MainComponent }
  ]}];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }