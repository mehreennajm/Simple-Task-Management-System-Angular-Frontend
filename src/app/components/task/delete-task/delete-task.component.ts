import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TaskService } from '../task-service';
import { Task } from 'src/app/models/task-model';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {
  @Input()
  targetModal: any;

  @Input()
  deleteTask: Task;

  constructor(private taskService:TaskService,
              private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.taskService.onDelete();
    this.bsModalRef.hide();
   }

   onClose(){
    this.bsModalRef.hide()
    }
  

}
