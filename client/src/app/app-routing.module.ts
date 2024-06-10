import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/gerente/register/register.component';
import { UsersComponent } from './components/gerente/users/users.component';
import { UserDetailComponent } from './components/gerente/user-detail/user-detail.component';
import { TaskComponent } from './components/director de obra/task/task.component';
import { ListObrasComponent } from './components/gerente/list-obras/list-obras.component';

import { GerenteGuard} from './guards/gerente.guard';
import { ObrasComponent } from './components/gerente/obras/obras.component';
import { GestionObrasGuard } from './guards/gestion-obras.guard';
import { ManagementTask } from './guards/management-task.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent, canActivate: [GerenteGuard]},
    {path: 'users', component: UsersComponent, canActivate: [GerenteGuard]},
    {path: 'userDetail/:id', component: UserDetailComponent,  canActivate: [GerenteGuard]},
    {path: 'obras', component:ObrasComponent, canActivate: [GestionObrasGuard]},
    {path: 'list-obras', component:ListObrasComponent, canActivate: [GestionObrasGuard]},
    {path: 'task/:id', component:TaskComponent, canActivate: [ManagementTask]},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**' , pathMatch: 'full', redirectTo: 'home'}
  ]},
  
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: '**' , pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
