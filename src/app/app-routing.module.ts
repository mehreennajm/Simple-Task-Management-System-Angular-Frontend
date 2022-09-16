import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/_auth/auth.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',redirectTo:''},
  {path:'users',component:UserComponent,canActivate:[AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path:'tasks',component:TaskComponent,canActivate:[AuthGuard], data:{role:'ROLE_MANAGER'}},
  { path: 'forbidden', component: ForbiddenComponent },
  {path: '**', component:PageNotFoundComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
