import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { UserItem } from '../models/user-item';
import { shareReplay, tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static host = `http://139.177.182.18:8000/users`;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkIfSessionExists());
  private isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) { }

  public register(username: String, nickname: String, email: String, password: String, age: Number): Observable<any> {

    return this.http.post<any>(AuthService.host + `/register`, { username: username, age: age, nickname: nickname, email: email, password: password });
  }

  public login(username: String, password: String): Observable<any> {

    return this.http.post<any>(AuthService.host + `/login`, { username: username, password: password }, {
      observe: 'response'
    }).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        var decoded = jwt_decode(res.body.accessToken);
        this.setSession(res.body.accessToken, res.body.refreshToken, decoded);
        this.loggedIn.next(true);
        console.log("LOGGED IN!");
      })
    );
  }

  checkIfSessionExists(): boolean {
    if (localStorage.getItem('accessToken')) {
      return true;
    } else {
      return false;
    }
  }

  public getUserId() {
    return localStorage.getItem("userId")
  }

  public logout() {
    this.removeSession();
    this.loggedIn.next(false);
  }

  private removeSession() {
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }


  private setSession(accessToken: string, refreshToken: string, decoded: any) {
    if (decoded.privilege == 'Admin') this.isAdmin.next(true);
    localStorage.setItem('userId', decoded.idUser)
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }


}
