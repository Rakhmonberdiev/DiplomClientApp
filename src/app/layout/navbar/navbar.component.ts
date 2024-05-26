import { Component } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public accountService: AccountService, private router: Router){}

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  isTicketsRoute(): boolean{
    return this.router.url==='/tickets'
  }
  isHomeRoute(): boolean{
    return this.router.url==='/'
  }
}
