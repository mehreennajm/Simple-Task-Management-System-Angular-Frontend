import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from 'src/app/models/user-model';
import { UserService } from '../user/user-service';
import { Task } from 'src/app/models/task-model';
import { TaskService } from './task-service';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[];
  users: User[];
  data:any;
  selectedStatus = "";
  selectedUser : User;
  dtOptions: any = {};
   // form group
   submitForm: FormGroup;

  constructor(
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef, 
    public userService: UserService,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
  ) {
    this.submitForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      createDate: ['',Validators.required],
      dueDate: ['',Validators.email],
      description: ['',Validators.required],
      userr: [null,Validators.required],
      status: ['',Validators.required],
     
    });

  }

  ngOnInit(): void {
  
    this.taskService.getTasks();
    this.taskService.taskChanged.subscribe((t) => {
      this.data = t;
      setTimeout(()=>{                          
        $('#dataableTasks').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          retrieve: true,
          lengthMenu : [5, 10, 25],
          order:[[1,"desc"]],
      } );
      }, 1);
      });
    this.userService.getListOfManagers();
    this.userService.userChangedTwo.subscribe((u) => {
      this.users = u
    });
  }
  
  task:Task;
  //display the details in modal
  openDetails(targetModal: any,task: Task) {
    this.taskService.openDetails(targetModal,task);
      this.task = task;
  }
  
  open(content: any) {
    this.taskService.openCreateModal(content);
  }


  onSubmit(form:any) {
   this.taskService.onSubmit(form);
  }

  openEdit(task: Task):void {
    this.bsModalService.show(EditTaskComponent, {
      class: 'modal-dialog',
      initialState: {

        task: task,
        
        users: this.users,
  
        selectedStatus: this.selectedStatus = task.status,
       
        selectedUser : this.selectedUser = task.userr,
      }
    });
  }  
  
  openDelete(targetModal: any, task: Task) {
   this.taskService.openDelete(targetModal,task);
  }
  

  onDelete() {
   this.taskService.onDelete();
  }
}
