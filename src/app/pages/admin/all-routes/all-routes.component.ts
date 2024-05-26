import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { RouteEn } from '../../../_models/routeEn';
import { Pagination } from '../../../_models/pagination';
import { FadeIn } from '../animation';
import { DeleteConfirmModalComponent } from '../modals/delete-confirm-modal/delete-confirm-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RoutCreateModalComponent } from '../modals/rout-create-modal/rout-create-modal.component';
import { ToastComponent } from '../../toast/toast.component';

@Component({
  selector: 'app-all-routes',
  templateUrl: './all-routes.component.html',
  styleUrl: './all-routes.component.css',
  animations: [FadeIn(300, true)]
})
export class AllRoutesComponent implements OnInit{
  search:string ='';
  @ViewChild('search', {static:true}) searchTerm!: ElementRef;
  routes: RouteEn[]=[];
  pagination!: Pagination
  pageNumber = 1;
  pageSize = 4;
  deleteModalRef:BsModalRef<DeleteConfirmModalComponent> = new BsModalRef<DeleteConfirmModalComponent>();
  createModalRef:BsModalRef<RoutCreateModalComponent> = new BsModalRef<RoutCreateModalComponent>();
  toastModalRef:BsModalRef<ToastComponent> = new BsModalRef<ToastComponent>();
  constructor(private adminService:AdminService, private modalService:BsModalService){

  }
  ngOnInit(): void {
    this. getAllRoutes()
  }

  getAllRoutes(){
    this.adminService.GetallRT(this.pageNumber,this.pageSize,this.search).subscribe({
      next: response=> {
        if(response.result&&response.pagination){
          this.routes = response.result;
          this.pagination = response.pagination;
        }
      },
    })
  }

  onSearch(){
    this.search = this.searchTerm.nativeElement.value;
    this.getAllRoutes();
  }

  onReset(){
    this.search = this.searchTerm.nativeElement.value = '';
    this.getAllRoutes();
  }
  changePage(event:any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.getAllRoutes();
      }
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
            this.adminService.deleteRoutes(id).subscribe(
              ()=>{
                this.getAllRoutes();
              }
            )
          }
        }
      });
    }

    openCreateModal(){
      const config = {
        animated: true
      };
      this.createModalRef = this.modalService.show(RoutCreateModalComponent,config);
      this.createModalRef.onHide?.subscribe({
        next: () => {
          const createConfirm = this.createModalRef.content?.createConfirm;
          if (createConfirm) {
            this.getAllRoutes();
            this.toastModalRef = this.modalService.show(ToastComponent, config);
            setTimeout(() => {
              this.toastModalRef.hide();
            }, 1000);
          }
        }
      });
    }
}
