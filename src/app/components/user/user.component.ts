import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from './user-service';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { EditUserComponent } from './edit-user/edit-user.component';
import { User } from 'src/app/models/user-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  data:any;
  dtOptions: any = {};
  selectedDep : string = "";
  @ViewChild('f') f: NgForm;
  submitForm:FormGroup;


  constructor(
    private userService: UserService,
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
   
  ) {
    this.submitForm =  this.formBuilder.group({
      userId: [null,Validators.required],
      firstName: ['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password:['',Validators.required],
      role: ['',Validators.required],
      
    });
  }

  
  ngOnInit(): void {
    this.userService.getUsers();
    this.userService.userChanged.subscribe((u) => {
      this.data = u;
      setTimeout(()=>{                          
        $('#dataableUsers').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          retrieve:true,
          lengthMenu : [5, 10, 25],
        });
      },1);
    });
   
    }

  
  open(content: any) {
    this.userService.openCreateModal(content);
  }

  private getDismissReason(reason: any){
    this.userService.getDismissReason(reason);
  }

  onSubmit(user:User) {
   this.userService.onSubmitUser(user);
   this.userService.getUsers();
   
  }


  openEdit(user: User):void {
    this.bsModalService.show(EditUserComponent, {
      class: 'modal-dialog',
      initialState: {
        //@ts-ignore
        user: user
      }
    });
  }

  openDelete(targetModal: any, user: User) {
   this.userService.openDeleteModal(targetModal,user);
  }

  onDelete() {
    this.userService.onDeleteUser();
    this.userService.getUsers();
  }

 
}
