import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { ToastrService } from "ngx-toastr";

import { User } from "../shared/models/User";
import { IUserLogin } from "../shared/interfaces/IUserLogin";
import { USER_LOGIN_URL } from "../shared/constants/urls";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin)
      .pipe(
        tap({
          next: (user) => {
            this.userSubject.next(user);
            this.toastrService.success(
              `welcome to Foodmine ${user}`,
              'Login Successful'
            )
          }, error: (errorRespons) => {
            this.toastrService.error(errorRespons.error, 'Login Faild');
          }
        })
      );
  }

  private setUserToLocalStorage(user: User) {

  }

}
