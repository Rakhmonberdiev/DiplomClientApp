import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

baseUrl = environment.apiUrl
private currentUserSource = new BehaviorSubject<User | null>(null);
currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl+'auth/login', model).pipe(
      map((response: User)=>{
        const user = response;
        if(user){
          this.setCurrentUser(user)
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User){
    user.roles=[];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles)? user.roles = roles : user.roles.push(roles)
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  getDecodedToken(token: string){
    return JSON.parse(atob(token.split('.')[1]));
  }


}