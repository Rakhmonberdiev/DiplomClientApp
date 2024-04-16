import { Component } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: any = {};
  showError: boolean = false;
  errorMessage!: string;
  constructor(public accountService: AccountService, private router: Router){

  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: _ =>{
        this.router.navigateByUrl('/'),
        this.model = {}
      },
      error: error =>{
        this.showError = true
        this.errorMessage = error.error
      }
    })
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
