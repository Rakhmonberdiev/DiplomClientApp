import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-dist-create-modal',
  templateUrl: './dist-create-modal.component.html',
  styleUrl: './dist-create-modal.component.css'
})
export class DistCreateModalComponent implements OnInit {
  createConfirm: boolean = false;
  createForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined
  constructor(private bsModalRef: BsModalRef,private fBuilder: FormBuilder,private adminService:AdminService){

  }
  ngOnInit(): void {
   this.initializeForm();
  }

  confirm(){
    const value = {...this.createForm.value};
    this.adminService.createDist(value).subscribe({
      next: _ =>{
        this.createConfirm = true;
        this.bsModalRef.hide();
      },
      error: error=>{
        this.validationErrors = error;
      }
    })
  }

  decline(){
    this.createConfirm = false;
    this.bsModalRef.hide();
  }


  initializeForm(){
    this.createForm = this.fBuilder.group({
      title: ['', Validators.required]
    });    
  }

  
}
