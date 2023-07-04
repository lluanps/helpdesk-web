import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { InstrutorListComponent } from './components/instrutor/instrutor-list/instrutor-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { InstrutorCreateComponent } from './components/instrutor/instrutor-create/instrutor-create.component';
import { InstrutorUpdateComponent } from './components/instrutor/instrutor-update/instrutor-update.component';
import { InstrutorDeleteComponent } from './components/instrutor/instrutor-delete/instrutor-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';

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
      {path: 'instrutores/update/:id', component: InstrutorUpdateComponent},
      {path: 'instrutores/delete/:id', component: InstrutorDeleteComponent},

      {path: 'clientes', component: ClienteListComponent},
      {path: 'clientes/create', component: ClienteCreateComponent},
      {path: 'clientes/update/:id', component: ClienteUpdateComponent},
      //{path: 'clientes/delete/:id', component: ClienteDeleteComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
