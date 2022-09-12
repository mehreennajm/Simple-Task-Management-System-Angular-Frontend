import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',redirectTo:''},
  {path:'users',component:UserComponent},
  {path:'tasks',component:TaskComponent},
  { path: 'forbidden', component: ForbiddenComponent },
  {path: '**', component:PageNotFoundComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
