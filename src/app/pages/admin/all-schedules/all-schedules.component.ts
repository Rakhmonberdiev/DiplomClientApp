import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../../_models/schedule';
import { FadeIn } from '../animation';
import { AdminService } from '../admin.service';
import { DeleteConfirmModalComponent } from '../modals/delete-confirm-modal/delete-confirm-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrl: './all-schedules.component.css',
  animations: [FadeIn(300, true)]
})
export class AllSchedulesComponent implements OnInit{
  schedules: Schedule[]=[];
  deleteModalRef:BsModalRef<DeleteConfirmModalComponent> = new BsModalRef<DeleteConfirmModalComponent>();
constructor(private adminService: AdminService,private modalService:BsModalService){

}
ngOnInit(): void {
  this.loadSchedules();
}


loadSchedules(){
  this.adminService.GetAllSCH().subscribe(rs=>{
    this.schedules = rs;
  })
}

openDeleteModal(id: string) {
  const config = {
    animated: true
  };
  this.deleteModalRef = this.modalService.show(DeleteConfirmModalComponent, config);
  this.deleteModalRef.onHide?.subscribe({
    next: () => {
      const deleteConfirm = this.deleteModalRef.content?.deleteConfirm;
      if (deleteConfirm) {
        this.adminService.deleteSchedule(id).subscribe(
          ()=>{
            this.loadSchedules();
          }
        )
      }
    }
  });
}
}
