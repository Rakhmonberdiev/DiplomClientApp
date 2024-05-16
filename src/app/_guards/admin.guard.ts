import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AccountService } from "../_services/account.service";
import { map } from "rxjs";




export const adminGuard: CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);
    const router = inject(Router);
  
    return accountService.currentUser$.pipe(
      map(user=>{
        if(!user) return false;
        if(user.roles.includes('Admin')){
          return true;
        } else{
          router.navigateByUrl('/401')
          return false;
        }
      })
    )
  };