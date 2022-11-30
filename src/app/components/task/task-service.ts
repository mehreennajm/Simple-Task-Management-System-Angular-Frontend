import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject } from "rxjs";
import { Task } from 'src/app/models/task-model';
import { ToastrService } from "ngx-toastr";
import { DeleteTaskComponent } from "./delete-task/delete-task.component";
import { BsModalService } from "ngx-bootstrap/modal";

@Injectable()
export class TaskService implements OnInit {
    
    deleteId: number;
    editForm: FormGroup;
    taskChanged=new Subject<Task[]>;
    selectedStatus = "Created";
  
    constructor(
      private httpClient: HttpClient,
      private modalService: NgbModal,
      private formBuilder: FormBuilder,
      private toastr: ToastrService ,
      private bsModalService: BsModalService,
    ) {}
  
    ngOnInit(): void {
      this.editForm = this.formBuilder.group({
        taskId: [""],
        title: ["",Validators.required],
        description: [""],
        createDate: ["",Validators.required],
        dueDate: ["",Validators.required],
        status: ["",Validators.required],
        user: [null,Validators.required],
      });
    }
  
    getTasks() {
        this.httpClient.get<any>("api/tasks").subscribe((response) => {
            this.taskChanged.next(response);
          });
    }


    onSubmit(form:any) {
      const url = "api/tasks/add-task";
      this.httpClient.post(url, form).subscribe((result) => {
        this.toastr.success("A new task has been added successfully!")
        this.getTasks(); //reload the table
      });
      
    }

     
      
    onUpdateTask(task: Task): Observable<any> {
        return this.httpClient.put(`api/tasks/${task.taskId}/edit`, task);
      }
  
    openDelete(targetModal: any, task: Task) {
      this.deleteId = task.taskId;
      this.bsModalService.show(DeleteTaskComponent, {
        class: 'modal-dialog',
        initialState: {
          //@ts-ignore
          targetModal: targetModal,
          deleteTask : task
        }
      });
    }
  
    onDelete() {
      const deleteURL = "api/tasks/" + this.deleteId + "/delete";
      this.httpClient.delete(deleteURL).subscribe((results) => {
        this.toastr.success("Deleted successfully!");
        this.getTasks();
        this.modalService.dismissAll();
      });
    }
}
