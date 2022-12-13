import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user-model';
import { UserService } from '../user-service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() selectedRole = "";
  @Input()
  user: User;
  editForm: FormGroup;
  url: any;
  msg="";
  file_error:any;
  selectedFile :File;
  selectedFileName = '';
  disable_file_uplaod_button = true;
  profilePhotoUrl:any;
  
  constructor(private bsModalRef: BsModalRef,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) {

      this.editForm =  this.formBuilder.group({
        userId: [null,Validators.required],
        firstName: ['',Validators.required],
        lastName:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required],
        role: ['',Validators.required],
        profilePhoto: ['',Validators.required],
        
        
      });

    }
    

    ngOnInit(): void {
      // Set the profile photo URL
      this.profilePhotoUrl = `data:image/jpeg;base64,${this.user.profilePhoto}`;
      // Patch the existing form values
      this.editForm.patchValue({
            userId: this.user.userId,
            firstName: this.user.firstName,
            lastName: this.user.lastName, 
            email: this.user.email, 
            password: this.user.password, 
            role: this.user.role,
            profilePhoto:this.profilePhotoUrl
            
      }); }
      
    // on file select event
    onFileChange(event:any) {
      if (event.target.files.length > 0) {
          const fileHolder = event.target.files[0];
        this.editForm.patchValue({
          profilePhoto: fileHolder
        });  
      }
  
      this.file_error = "";
      this.selectedFile = event.target.files[0];
      this.selectedFileName = this.selectedFile.name;
  
      //check the file size and extension
      let fileExtension = null;
      if(this.selectedFile.size > 2000000){
        this.disable_file_uplaod_button = false;
        this.file_error = "Image Size must be less than 2 MB"
      }
      else{
          fileExtension = this.selectedFile.name.split('?')[0].split('.').pop();
          if(fileExtension=='png' || fileExtension=='jpg' || fileExtension=='jpeg'){
            this.disable_file_uplaod_button = true;
          }
          else{
            this.disable_file_uplaod_button = false;
            this.file_error = "The image format must be  (.jpg , .jpeg or .png)";
          }
      }
      
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.msg = "";
        this.url = reader.result; 
      }
    }
    onSave() {
      const form = new FormData();
        form.append('userId', this.editForm.get('userId')?.value);
        form.append('profilePhoto', this.editForm.get('profilePhoto')?.value);
        form.append('firstName', this.editForm.get('firstName')?.value);
        form.append('lastName', this.editForm.get('lastName')?.value);
        form.append('password', this.editForm.get('password')?.value);
        form.append('email', this.editForm.get('email')?.value);
        form.append('role', this.editForm.get('role')?.value);
      
        
      this.userService.onUpdateUser(form).subscribe((results) => {
      
        this.toastr.success("Updated successfully!")
        this.bsModalRef.hide();
        this.userService.getUsers();
        
      }); 
        }

    onClose(){
        this.bsModalRef.hide()
        }

}
