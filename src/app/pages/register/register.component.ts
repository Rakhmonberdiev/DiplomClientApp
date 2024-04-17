import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(private accountService: AccountService, private fBuilder: FormBuilder, private router: Router){

  }

  ngOnInit():void{
    this.initializeForm();
  }
  register(){
    const values = {...this.registerForm.value}
    this.accountService.register(values).subscribe({
      next: _ =>{
        this.router.navigateByUrl('/');
      },
      error: error=>{
        this.validationErrors = error;
      }
    })
  }
  initializeForm(){
    this.registerForm = this.fBuilder.group({
      userName: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: ()=> this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
    
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }
}
