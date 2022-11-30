import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user-model';
import { BsModalRef } from "ngx-bootstrap/modal";
import { TaskService } from '../task-service';
import { Task } from 'src/app/models/task-model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/user-service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @Input() selectedStatus = "";

  editForm: FormGroup;

  @Input()
  task: Task;

  @Input() users: User[];

  @Input() selectedUser: User;
 
  data:any;


  constructor(
    private bsModalRef: BsModalRef,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService:UserService
  ) {
    this.editForm = this.formBuilder.group({
      taskId: [null, Validators.required],
      title: ["", Validators.required],
      createDate: ["", Validators.required],
      dueDate: ["", Validators.required],
      status: [""],
      description: [""],
      userr: [null,Validators.required],
    });
  }

    ngOnInit(): void {
    this.editForm.patchValue({
      taskId: this.task.taskId,
      title: this.task.title,
      createDate: this.task.createDate,
      dueDate: this.task.dueDate,
      status: this.task.status,
      description: this.task.description,
      userr:  this.task.userr,
    });
    this.userService.getListOfManagers();
    this.userService.userChangedTwo.subscribe((u) => {
      this.users = u
    });

  }

  onSave(task:Task) {
    this.taskService.onUpdateTask(task).subscribe((results) => {
      this.data = results;
      console.log(this.data);
      this.toastr.success("Updated the task successfully!");
      this.taskService.getTasks();
      this.bsModalRef.hide();

    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
