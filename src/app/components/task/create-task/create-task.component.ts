import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Task } from 'src/app/models/task-model';
import { User } from 'src/app/models/user-model';
import { UserService } from '../../user/user-service';
import { TaskService } from '../task-service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  users: User[];
  selectedStatus = "";
  selectedUser : User;
  @Input()
  task:Task
  // form group
  submitForm: FormGroup;
  constructor( private formBuilder: FormBuilder,
               private taskService:TaskService,
               private bsModalRef: BsModalRef,
               private userService:UserService) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      createDate: ['',Validators.required],
      dueDate: ['',Validators.required],
      description: ['',Validators.required],
      userr: [null,Validators.required],
      status: ['',Validators.required],
     
    });

    this.userService.getListOfManagers();
    this.userService.userChangedTwo.subscribe((u) => {
      this.users = u
    });
  }
  onSubmit(form:Task) {
    this.taskService.onSubmit(form);
    this.bsModalRef.hide();
   }
   onClose(){
    this.bsModalRef.hide()
    }

}
