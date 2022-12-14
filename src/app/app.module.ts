import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalService } from "ngx-bootstrap/modal";
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { TaskComponent } from './components/task/task.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { EditTaskComponent } from './components/task/edit-task/edit-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './components/user/user-service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TaskService } from './components/task/task-service';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './components/_services/auth.service';
import { UserAuthService } from './components/_services/user-auth.service';
import { AuthInterceptor } from './components/_auth/auth.intercepter';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { DeleteTaskComponent } from './components/task/delete-task/delete-task.component';
import { DisplayTaskComponent } from './components/task/display-task/display-task.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TaskComponent,
    PageNotFoundComponent,
    SidebarComponent,
    EditUserComponent,
    EditTaskComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CreateUserComponent,
    DeleteUserComponent,
    CreateTaskComponent,
    DeleteTaskComponent,
    DisplayTaskComponent,
    NavbarComponent,
  ],
  imports: [
    DataTablesModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
    
  ],
  providers: [UserService,FormBuilder,BsModalService,TaskService,AuthService,UserAuthService
    ,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
