import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from './user-service';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { EditUserComponent } from './edit-user/edit-user.component';
import { User } from 'src/app/models/user-model';
import { DomSanitizer } from '@angular/platform-browser';

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
  url: any;
  msg="";
  thumbnail: any;


  file_error:any;
  selectedFile :File = null as any;
  selectedFileName = '';
  disable_file_uplaod_button:any = false;


  // form group
  submitForm: FormGroup;

  constructor(
    private userService: UserService,
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer) 
    {
    this.submitForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['',Validators.required],
      email: ['',Validators.email],
      password: ['',Validators.required],
      role: ['',Validators.required],
      profilePhoto: ['',Validators.required],
      fileSource: [null,Validators.required],
    });
  }


  ngOnInit(): void {
    this.userService.getUsers();
    this.userService.userChanged.subscribe((u:any) => {
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

  // on file select event
  onFileChange(event:any) {
    if (event.target.files.length > 0) {
       const fileHolder = event.target.files[0];
      this.submitForm.patchValue({
        fileSource: fileHolder
      });  
    }
    this.file_error = "";
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    let ext = null;
    if(this.selectedFile.size > 2000000){
      this.disable_file_uplaod_button = false;
      this.file_error = "Image Size must be less than 2 MB"
    }
   else{
      ext = this.selectedFile.name.split('?')[0].split('.').pop();
      if(ext=='png' || ext=='jpg' || ext=='jpeg' || ext=='gif' ){
        this.disable_file_uplaod_button = true;
      }else{
        this.disable_file_uplaod_button = false;
        this.file_error = "Please enter valid Image e.g (jpg, jpeg,png,gif)";
      }
    }
    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
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
