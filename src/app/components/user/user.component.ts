import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user-service';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { EditUserComponent } from './edit-user/edit-user.component';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  dtOptions: any = {};
  selectedDep : string = "";
  @ViewChild('f') f: NgForm;


  constructor(
    private userService: UserService,
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef, 
  ) {}

  
  ngOnInit(): void {
    this.userService.getUsers();
    this.userService.userChanged.subscribe((u) => {
      this.users = u;                         
        $('#dataableUsers').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          destroy: true,
          lengthMenu : [5, 10, 25],
      });
      });

  }
  
  open(content: any) {
    this.userService.openCreateModal(content);
  }

  private getDismissReason(reason: any){
    this.userService.getDismissReason(reason);
  }

  onSubmit(f: NgForm) {
   this.userService.onSubmitUser(f);
   this.ngOnInit();
  }


  openEdit(user: User):void {
    this.bsModalService.show(EditUserComponent, {
      class: 'modal-dialog',
      initialState: {
        //@ts-ignore
        user: user
      }
    });
  }

  openDelete(targetModal: any, user: User) {
   this.userService.openDeleteModal(targetModal,user);
  }

  onDelete() {
    this.userService.onDeleteUser();
    this.ngOnInit();
  }
}
