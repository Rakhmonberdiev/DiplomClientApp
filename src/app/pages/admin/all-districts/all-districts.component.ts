import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { District } from '../../../_models/district';

import { Pagination } from '../../../_models/pagination';
import { FadeIn } from '../animation';
import { DistUpdateModalComponent } from '../modals/dist-update-modal/dist-update-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteConfirmModalComponent } from '../modals/delete-confirm-modal/delete-confirm-modal.component';
import { DistCreateModalComponent } from '../modals/dist-create-modal/dist-create-modal.component';
import { ToastComponent } from '../../toast/toast.component';


@Component({
  selector: 'app-all-districts',
  templateUrl: './all-districts.component.html',
  styleUrl: './all-districts.component.css',
  animations: [FadeIn(300, true)]

})
export class AllDistrictsComponent implements OnInit {
  search?:string ='';
  @ViewChild('search', {static:true}) searchTerm!: ElementRef;
  dists: District[]=[];
  pagination!: Pagination
  pageNumber = 1;
  pageSize = 4;
  modalRef:BsModalRef<DistUpdateModalComponent> = new BsModalRef<DistUpdateModalComponent>();
  deleteModalRef:BsModalRef<DeleteConfirmModalComponent> = new BsModalRef<DeleteConfirmModalComponent>();
  createModalRef:BsModalRef<DistCreateModalComponent> = new BsModalRef<DistCreateModalComponent>();
  toastModalRef:BsModalRef<ToastComponent> = new BsModalRef<ToastComponent>();
  constructor(private adminService:AdminService, private modalService: BsModalService){

  }
  ngOnInit(): void {
    this.getDists();
  }

  getDists(){
    this.adminService.getAllDist(this.pageNumber,this.pageSize,this.search).subscribe({
      next: response=> {
        if(response.result&&response.pagination){
          this.dists = response.result;
          this.pagination = response.pagination;
        }
      },
    })
  }

  onSearch(){
    this.search = this.searchTerm.nativeElement.value;
    this.getDists();
  }

  onReset(){
    this.search = this.searchTerm.nativeElement.value = '';
    this.getDists();
  }
  changePage(event:any){
  if(this.pageNumber !== event.page){
    this.pageNumber = event.page;
    this.getDists();
    }
  }



 

  

  openModal(dist: District){
    const config ={ 
      animated: true,
      initialState : {
        distId: dist.id,
        title: dist.title
      }
    }
    this.modalRef = this.modalService.show(DistUpdateModalComponent, config);
    this.modalRef.onHide?.subscribe({
      next:()=>{
        const confirm = this.modalRef.content?.confirm
        if(confirm){
          this.getDists();
        }
      }
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
          this.adminService.deleteDist(id).subscribe(
            ()=>{
              this.getDists();
            }
          )
        }
      }
    });
  }

  openCreateModal(){
    const conf = {
      animated: true
    };
    this.createModalRef = this.modalService.show(DistCreateModalComponent, conf);
    this.createModalRef.onHide?.subscribe({
      next: () => {
        const confirm = this.createModalRef.content?.createConfirm;
        if(confirm){
          this.getDists();
          this.toastModalRef = this.modalService.show(ToastComponent, conf);
          setTimeout(() => {
            this.toastModalRef.hide();
          }, 1000);
        }
      }
    })
  }
}
