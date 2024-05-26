import { Component, ElementRef, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FadeIn } from '../animation';
import { TicketAdmin } from '../../../_models/ticketAdmin';
import { DeleteConfirmModalComponent } from '../modals/delete-confirm-modal/delete-confirm-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrl: './all-tickets.component.css',
  animations: [FadeIn(300, true)],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }]
})
export class AllTicketsComponent implements OnInit{
tickets : TicketAdmin[]=[];
search:string=''
@ViewChild('search', {static:true}) searchTerm!: ElementRef;
deleteModalRef:BsModalRef<DeleteConfirmModalComponent> = new BsModalRef<DeleteConfirmModalComponent>();

constructor(private adminService: AdminService,private modalService:BsModalService){

}
  ngOnInit(): void {
    this.loadData();
  }

loadData(){
  this.adminService.getAllTickets(this.search).subscribe(rs=>{
    this.tickets = rs;
  })
}

onSearch(){
  this.search = this.searchTerm.nativeElement.value;
  this.loadData();
}

onReset(){
  this.search = this.searchTerm.nativeElement.value = '';
  this.loadData();
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
        this.adminService.deleteTicket(id).subscribe(
          ()=>{
            this.loadData();
          }
        )
      }
    }
  });
}

convertToDate(dateString: string): Date {
  const dateParts = dateString.split('.');
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const year = parseInt(dateParts[2]);
  return new Date(year, month, day);
}
}
