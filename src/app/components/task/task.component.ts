import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from 'src/app/models/user-model';
import { UserService } from '../user/user-service';
import { Task } from 'src/app/models/task-model';
import { TaskService } from './task-service';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { DisplayTaskComponent } from './display-task/display-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  content:any;
  details:any;
  contentDelete:any;
  tasks: Task[];
  users: User[];
  data:any;
  selectedStatus = "";
  selectedUser : User;
  dtOptions: any = {};
  

  constructor(
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef, 
    private taskService: TaskService,
  ) {}

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

  }
  
  task:Task;
  //display the details in modal
  openDetails(details: any,task: Task) {
    this.bsModalService.show(DisplayTaskComponent, {
      class: 'modal-dialog',
      initialState: {
        //@ts-ignore
        details:details,
        task:task
      }
    });
      this.task = task;
  }
  
  open(content:any) {
    this.bsModalService.show(CreateTaskComponent, {
      class: 'modal-dialog',
      initialState: {
        //@ts-ignore
        task: this.content
      }
    });
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
  
  //opens delete task Modal
  openDelete(contentDelete: any, task: Task) {
   this.taskService.openDelete(contentDelete,task);
  }
  

 
}
