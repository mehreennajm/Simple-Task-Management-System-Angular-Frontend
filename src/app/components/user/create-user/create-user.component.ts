import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user-model';
import { UserService } from '../user-service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  // form group
  submitForm: FormGroup;
  @Input()
  user: User;
  url: any;
  msg="";
  file_error:any;
  selectedFile :File = null as any;
  selectedFileName = '';
  disable_file_uplaod_button:any = false;
  userImage:any;
  constructor(private userService: UserService,
              private bsModalRef: BsModalRef,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
      this.bsModalRef.hide();
      this.userService.getUsers();
  
  }
      
  onClose(){
    this.bsModalRef.hide()
    }

}
