import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrl: './delete-confirm-modal.component.css'
})
export class DeleteConfirmModalComponent implements OnInit{
  id:string='';

  constructor(private adminService:AdminService,public bsModalRef: BsModalRef){

  }
  
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
