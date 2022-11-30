import { Injectable} from "@angular/core";
import {OnInit } from "@angular/core";
import { map, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { User } from "src/app/models/user-model";
import { ToastrService } from "ngx-toastr";
import { DeleteUserComponent } from "./delete-user/delete-user.component";
import { BsModalService } from "ngx-bootstrap/modal";

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
    private toastr: ToastrService ,
    private bsModalService: BsModalService,
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

  getImage(){ 
      const serviceUrl = "api/" + this.imageName;
      return this.httpClient.get(serviceUrl);
  }
 
  onSubmitUser(user:FormData) {
    this.httpClient.post(`api/users/add-user`, user).subscribe((results) => {
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
    this.bsModalService.show(DeleteUserComponent, {
      class: 'modal-dialog',
      initialState: {
        //@ts-ignore
        targetModal: targetModal,
        deleteUser:user
      }
    });
  }

  onDeleteUser() {
    this.httpClient.delete(`api/users/${this.deleteId}/delete`).subscribe((results) => {
      this.toastr.success("User has been deleted successfully!")
      this.getUsers();
    });
  }
}
