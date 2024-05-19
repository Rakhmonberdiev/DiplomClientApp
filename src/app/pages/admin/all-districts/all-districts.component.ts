import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { District } from '../../../_models/district';

@Component({
  selector: 'app-all-districts',
  templateUrl: './all-districts.component.html',
  styleUrl: './all-districts.component.css'
})
export class AllDistrictsComponent {
  search:string ='';
  @ViewChild('search', {static:true}) searchTerm!: ElementRef;
  dists: District[]=[];
  constructor(private adminService:AdminService){

  }
  ngOnInit(): void {
    this.getDists();
  }

  getDists(){
    this.search = this.searchTerm.nativeElement.value;
    this.adminService.getAllDists(this.search).subscribe(rs=>{
      this.dists = rs
    })
  }

  onSearch(){
    this.search = this.searchTerm.nativeElement.value;
    this.getDists();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.getDists();
  }
}
