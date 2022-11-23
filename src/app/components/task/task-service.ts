import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject } from "rxjs";
import { User } from "src/app/models/user-model";
import { Task } from 'src/app/models/task-model';
import { ToastrService } from "ngx-toastr";

@Injectable()
export class TaskService implements OnInit {
    tasks: Task
    deleteId: number;
    closeResult: string;
    editForm: FormGroup;
    selectedProject: string = "";
    taskChanged=new Subject<Task[]>;
    selectedStatus = "Created";
    @ViewChild('f') form: NgForm;
  
    constructor(
      private httpClient: HttpClient,
      private modalService: NgbModal,
      private formBuilder: FormBuilder,
      private toastr: ToastrService 
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


  
    openCreateModal(content: any) {
      this.modalService
        .open(content, { ariaLabelledBy: "modal-basic-title" })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
  
    public getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return "by pressing ESC";
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return "by clicking on a backdrop";
      } else {
        return `with: ${reason}`;
      }
    }
  
    onSubmit(form:any) {
      const url = "api/tasks/add-task";
      this.httpClient.post(url, form).subscribe((result) => {
        this.toastr.success("A new task has been added successfully!")
        this.getTasks(); //reload the table
        this.modalService.dismissAll(); //dismiss the modal
      });
      
    }

      //display the details in modal
      openDetails(targetModal: any, task: Task) {
        this.modalService.open(targetModal, {
          centered: true,
          backdrop: "static",
          size: "lg",
        });
      }

      
    onUpdateTask(task: Task): Observable<any> {
        return this.httpClient.put(`api/tasks/${task.taskId}/edit`, task);
      }
  
    openDelete(targetModal: any, task: Task) {
      this.deleteId = task.taskId;
      this.modalService.open(targetModal, {
        backdrop: "static",
        size: "lg",
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
