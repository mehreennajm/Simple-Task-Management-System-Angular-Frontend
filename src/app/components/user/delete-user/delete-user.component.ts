import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user-model';
import { UserService } from '../user-service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  @Input()
  targetModal: any;

  @Input()
  deleteUser: User;

  @Input()
  deleteId : number;
  constructor(private userService: UserService,
    private bsModalService: BsModalService,
    private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  
  onDelete() {
    this.userService.onDeleteUser();
    this.bsModalRef.hide();
  }
  onClose(){
    this.bsModalRef.hide()
    }
}
