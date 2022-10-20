import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { ProfileImageComponent } from './componentes/profile-image/profile-image.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile-img', component: ProfileImageComponent},
  {path: '', component: MainComponent,
    children: [
      { path: 'portfolio', component: MainComponent }
  ]}];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }