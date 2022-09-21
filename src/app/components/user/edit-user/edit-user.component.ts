import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user-model';
import { UserService } from '../user-service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() selectedStatus = "";
  
  constructor(private bsModalRef: BsModalRef,
    private userService: UserService,
    private formBuilder: FormBuilder) {

      this.editForm =  this.formBuilder.group({
        userId: [null,Validators.required],
        firstName: ['',Validators.required],
        lastName:['',Validators.required],
        username:['',Validators.required],
        password:['',Validators.required],
        role: ['',Validators.required],
        
      });

    }
    
        @Input()
        user: User;
        editForm: FormGroup;
        ngOnInit(): void {
        this.editForm.patchValue({
        userId: this.user.userId,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        username: this.user.username,
        password: this.user.password,
        role: this.user.role
        })
        }

        onSave(user:User) {
        this.userService.onUpdateUser(user).subscribe((results) => {
        this.user = results;
        this.userService.getUsers();
        this.bsModalRef.hide();
        }); 
        }

        onClose(){
        this.bsModalRef.hide()
        }

}
