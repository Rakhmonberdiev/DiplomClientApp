import { CanActivateFn, Router } from "@angular/router";
import { AccountService } from "../_services/account.service";
import { inject } from "@angular/core";
import { map } from "rxjs";



export const authGuard: CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);
    const router = inject(Router);
    return accountService.currentUser$.pipe(
      map(user=>{
        if(user) return true;
        else{
          router.navigateByUrl('/register');
          return false;
        }
      })
    )
  };