import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'home', component: HomeComponent},
  {path:'users',component:UserComponent},
  {path:'tasks',component:TaskComponent},
  {path: '**', component:PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
