import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path: 'home', component: LoginComponent},
  {path:'users',component:UserComponent},
  {path:'tasks',component:TaskComponent},
  { path: 'logout', component: LogoutComponent },
  {path: '**', component:PageNotFoundComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
