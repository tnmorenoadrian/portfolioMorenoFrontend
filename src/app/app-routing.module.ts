import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './componentes/main/main.component';
import { AuthGuard } from './servicios/auth.guard';

const routes: Routes = [
  
{path: '', redirectTo: '/portfolio', pathMatch: 'full'},  
{path: 'portfolio', component: MainComponent},
{path: 'portfolio-edit', component: MainComponent, canActivate: [AuthGuard]}

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }