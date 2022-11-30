import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Task } from 'src/app/models/task-model';

@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.css']
})
export class DisplayTaskComponent implements OnInit {
  @Input()
  task:Task
  @Input()
  details:any
  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  onClose() {
    this.bsModalRef.hide();
  }
}
