import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalService } from "ngx-bootstrap/modal";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { TaskComponent } from './components/task/task.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { EditTaskComponent } from './components/task/edit-task/edit-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './components/user/user-service';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { TaskService } from './components/task/task-service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TaskComponent,
    PageNotFoundComponent,
    SidebarComponent,
    EditUserComponent,
    EditTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [UserService,FormBuilder,BsModalService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
