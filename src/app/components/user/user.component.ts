import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from './user-service';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { EditUserComponent } from './edit-user/edit-user.component';
import { User } from 'src/app/models/user-model';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

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

  // form group
  submitForm: FormGroup;
  fileHolder: File | null;

  constructor(
    private userService: UserService,
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    
   
  ) {
    this.submitForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['',Validators.required],
      email: ['',Validators.email],
      password: ['',Validators.required],
      role: ['',Validators.required],
      profilePhoto: [''],
      fileSource: [null],
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

  // on file select event
  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      this.fileHolder = event.target.files[0];
      this.submitForm.patchValue({
        fileSource: this.fileHolder
      });
      console.log(this.fileHolder);
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('profilePhoto', this.submitForm.get('fileSource')?.value);
    formData.append('firstName', this.submitForm.get('firstName')?.value);
    formData.append('lastName', this.submitForm.get('lastName')?.value);
    formData.append('password', this.submitForm.get('password')?.value);
    formData.append('email', this.submitForm.get('email')?.value);
    formData.append('role', this.submitForm.get('role')?.value);
   this.userService.onSubmitUser(formData);
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
