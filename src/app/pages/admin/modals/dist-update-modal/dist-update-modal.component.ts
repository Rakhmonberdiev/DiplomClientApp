import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from '../../admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dist-update-modal',
  templateUrl: './dist-update-modal.component.html',
  styleUrl: './dist-update-modal.component.css'
})
export class DistUpdateModalComponent implements OnInit {
  distId!: string;
  title!:string;
  titleForm: FormGroup;
  constructor(public bsModalRef: BsModalRef,private adminService: AdminService, private fBuilder: FormBuilder){
    this.titleForm = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }
  ngOnInit(): void {
    this.loadModel();
  }

  loadModel(){
    this.adminService.getByIdDist(this.distId).subscribe((data: any) => {
      this.title = data.title;
    });
  }



  submit(){
  const distId = this.distId;
    console.log(this.title)
    this.adminService.updateDist(distId,this.title).subscribe(
      ()=>{
        this.bsModalRef.hide();
      }
    )
  }
}

