import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from '../../admin.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedule-create-modal',
  templateUrl: './schedule-create-modal.component.html',
  styleUrl: './schedule-create-modal.component.css'
})
export class ScheduleCreateModalComponent {
  createConfirm: boolean = false;
  mytime? : Date
  minute: number = 30;
  constructor(private bsModalRef: BsModalRef,private adminService:AdminService){

  }
  decline(){
    this.createConfirm = false;
    this.bsModalRef.hide();
  }

  sendToServer(){
    if(this.mytime){
      let hours = this.mytime.getHours();
      let minutes = this.mytime.getMinutes();
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      const value = {
        title : timeString
      }
      this.adminService.createSchedule(value).subscribe({
        next: _ =>{
          this.createConfirm = true;
          this.bsModalRef.hide();
        }
      })
    }
  }


}
