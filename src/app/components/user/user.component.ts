import { Component, OnInit, Sanitizer} from '@angular/core';
import {  FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { UserService } from './user-service';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { EditUserComponent } from './edit-user/edit-user.component';
import { User } from 'src/app/models/user-model';
import {DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  data:any;
  dtOptions: any = {};
  selectedDep : string = "";
  userImage:any;
  content: User;
  contentDelete: any;
  deleteUser: User;
  deleteId: number;

  // form group
  submitForm: FormGroup;

  constructor(
    private userService: UserService,
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef,
    private sanitizer:DomSanitizer) 
    {}


  ngOnInit(): void {
    
      this.userService.getUsers();
        
      this.userService.userChanged.subscribe((u:any) => {
          
      let objectURL = u.profilePhoto;

      this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.data  = u;
      setTimeout(()=>{                          
        $('#dataableUsers').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          retrieve:true,
          lengthMenu : [5, 10, 25],
        });
      },1);
    });
   
    }


// opens Create  Modal
  open(content: User) {
    this.bsModalService.show(CreateUserComponent, {
      class: 'modal-dialog',
      initialState: {
        //@ts-ignore
        user: content
      }
    });
  }

  
// opens Edit Modal
  openEdit(user: User):void {
    this.bsModalService.show(EditUserComponent, {
      class: 'modal-dialog',
      initialState: {
        //@ts-ignore
        user: user
      }
    });
  }

  //opens delete Modal
  openDelete(targetModal: any, user: User) {
    this.userService.openDeleteModal(targetModal,user);
   }
  
 

 
}
