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
        profilePhoto: [''],
        fileSource: [null],
        
      });

      
    }
    

  ngOnInit(): void {
        this.editForm.patchValue({
        userId: this.user.userId,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role,
        profilePhoto:this.user.profilePhoto
        })
    }
        // on file select event
  onFileChange(event:any) {
    if (event.target.files.length > 0) {
       const fileHolder = event.target.files[0];
      this.editForm.patchValue({
        fileSource: fileHolder
      });  
    }
    var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
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
        form.append('profilePhoto', this.editForm.get('fileSource')?.value);
        form.append('firstName', this.editForm.get('firstName')?.value);
        form.append('lastName', this.editForm.get('lastName')?.value);
        form.append('password', this.editForm.get('password')?.value);
        form.append('email', this.editForm.get('email')?.value);
        form.append('role', this.editForm.get('role')?.value);
        
      
        this.userService.onUpdateUser(form).subscribe((results) => {
        if( this.user = results){
          this.toastr.success("Updated successfully!")
          console.log(results)
        }
        else{
          this.toastr.error("Something went wrong!");
          console.log(results)
        }
       
        this.bsModalRef.hide();
        this.userService.getUsers();
        }); 
        }

        onClose(){
        this.bsModalRef.hide()
        }

}
