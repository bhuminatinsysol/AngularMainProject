import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, catchError, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  emptyUser: User = {
    id:0,
    username:'',
    email: '',
    firstName:'',
    lastName: '',
    gender: '',
    image: '',
    token: ''
  }
  UserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.emptyUser);

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<User> {
    let credentials = {
      username: username,
      password: password,
      expiresInMins: 30,
    };

    return this.http.post<User>("https://dummyjson.com/auth/login", credentials).pipe(
      catchError(this.handleError), tap((data) => {
        this.handleCreateUser(data);
      })
    );

  }

  logout(){
    this.UserSubject.next(this.emptyUser);
    localStorage.removeItem("ecomloggedinUser");
    this.router.navigate(['/login']);
  }

  handleCreateUser(data: User) {
    let user: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
      token: data.token,
      expiresIn: new Date().getTime()
    };
    localStorage.setItem("ecomloggedinUser", JSON.stringify(user));
    this.UserSubject.next(user);
    this.autoLogOut(30*1000);
  }

  autoLogin()
  {
    let userdata:User = JSON.parse(localStorage.getItem("ecomloggedinUser") as string);
    if(userdata != null)
      {
        this.UserSubject.next(userdata);
        const timervalue = new Date().getTime() - new Date(userdata?.expiresIn as number).getTime();
        this.autoLogOut(timervalue);
      }
      else{
        return;
      }
  }

  autoLogOut(time:number) {
    // setTimeout(() => { this.logout();}, time);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}



export interface User {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  token: string,
  expiresIn?:number
}
