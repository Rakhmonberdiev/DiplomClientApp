import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrl: './delete-confirm-modal.component.css'
})
export class DeleteConfirmModalComponent{
  deleteConfirm: boolean = false;
  constructor(private bsModalRef: BsModalRef){

  }
  
  confirm(){
    this.deleteConfirm = true;
    this.bsModalRef.hide();
  }

  decline(){
    this.deleteConfirm = false;
    this.bsModalRef.hide();
  }
}
