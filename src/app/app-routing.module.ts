import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { InstrutorListComponent } from './components/instrutor/instrutor-list/instrutor-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { InstrutorCreateComponent } from './components/instrutor/instrutor-create/instrutor-create.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    component: NavComponent, canActivate: [AuthGuard], children: [
      {path: 'home', component: HomeComponent},
      
      {path: 'instrutores', component: InstrutorListComponent},
      {path: 'instrutores/create', component: InstrutorCreateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
