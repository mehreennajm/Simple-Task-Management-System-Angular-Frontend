import { Injectable, Input } from "@angular/core";
import {OnInit } from "@angular/core";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { User } from "src/app/models/user-model";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class UserService implements OnInit {
  users: User[];
  closeResult: string;
  editForm: FormGroup;
  deleteId: number;
  userChanged=new Subject<User[]>;
  userChangedTwo=new Subject<User[]>;
  imageUrl: string;
  imageName:any;
  

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService 
  ) {}
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [""],
      firstName: [""],
      lastName: [""],
      email: [""],
      role: [""],
    });
  }

  getUsers() {
    return this.httpClient.get<any>("api/users").subscribe((data) => {
      this.userChanged.next(data);
    });

  }


  getListOfManagers() {
    return this.httpClient.get<any>("/api/users/managers").subscribe((data) => {
      this.userChangedTwo.next(data);
    });

  }

  
    

  //   getImage(){
  //     const serviceUrl = "api/" + this.imageName;
  //     return this.httpClient.get<any>(serviceUrl);
  // }
  
  

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

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

 
  onSubmitUser(user:FormData) {
    const url = "api/users/add-user";
    this.httpClient.post(url,user).subscribe((results) => {
      this.toastr.success("User has been added successfully!");
      this.getUsers();
      this.modalService.dismissAll();
    });
  }


  onUpdateUser(formData:FormData): Observable<any> {
    return this.httpClient.put(`api/users/${formData.get('userId')}/edit`, formData);
  }

  openDeleteModal(targetModal: any, user: User) {
    this.deleteId = user.userId;
    this.modalService.open(targetModal, {
      backdrop: "static",
      size: "lg",
    });
  }

  onDeleteUser() {
    const deleteURL = "api/users/" + this.deleteId + "/delete";
    this.httpClient.delete(deleteURL).subscribe((results) => {
      this.toastr.success("User has been deleted successfully!")
      this.getUsers();
      this.modalService.dismissAll();
    });
  }
}
