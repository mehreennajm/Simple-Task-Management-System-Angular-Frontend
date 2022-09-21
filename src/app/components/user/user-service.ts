import { Injectable } from "@angular/core";
import {OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  NgForm,
} from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { User } from "src/app/models/user-model";

@Injectable()
export class UserService implements OnInit {
  users: User[];
  closeResult: string;
  editForm: FormGroup;
  deleteId: number;
  userChanged=new Subject<User[]>;
  userChangedTwo=new Subject<User[]>;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [""],
      firstName: [""],
      lastName: [""],
      username: [""],
      role: [""],
    });
  }

  getUsers() {
    return this.httpClient.get<User[]>("api/users").subscribe((data) => {
      this.userChanged.next(data);
    });

  }

  getListOfManagers() {
    return this.httpClient.get<any>("api/users/managers").subscribe((data) => {
      this.userChangedTwo.next(data);
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

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmitUser(f: NgForm) {
    const url = "api/users/add-user";
    this.httpClient.post(url, f.value).subscribe((results) => {
      this.getUsers();
      this.modalService.dismissAll();
    });
  }


  onUpdateUser(user: User): Observable<any> {
    return this.httpClient.put(`api/users/${user.userId}/edit`, user);
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
      this.getUsers();
      this.modalService.dismissAll();
    });
  }
}
