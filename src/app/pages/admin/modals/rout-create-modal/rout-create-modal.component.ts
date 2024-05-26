import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from '../../admin.service';
import { District } from '../../../../_models/district';
import { DistrictService } from '../../../../_services/district.service';

@Component({
  selector: 'app-rout-create-modal',
  templateUrl: './rout-create-modal.component.html',
  styleUrl: './rout-create-modal.component.css'
})
export class RoutCreateModalComponent implements OnInit {
  createConfirm: boolean = false;
  createForm: FormGroup = new FormGroup({});
  validationErrors!: string
  districts: District[]=[];
  districtsLoading = false;
  constructor(private bsModalRef: BsModalRef,private fBuilder: FormBuilder,private distService:DistrictService,private adminService: AdminService){

  }

  ngOnInit(): void {
    this.loadDistricts();
    this.createForm = this.fBuilder.group({
      startPointId: ['', Validators.required],
      endPointId: ['', Validators.required],
      price:['',Validators.required]
    });
  }
  decline(){
    this.createConfirm = false;
    this.bsModalRef.hide();
  }
  loadDistricts(){
    this.distService.getDistrict().subscribe(rs=>{
      this.districts = rs;
    })
  }
  confirm(){
    const value = {...this.createForm.value};
    this.adminService.createRout(value).subscribe({
      next: _ =>{
        this.createConfirm = true;
        this.bsModalRef.hide();
      },
      error: error=>{
        this.validationErrors = error.error;
      }
    })
  }
}
