import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserItem } from "./../models/user-item";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public static hostUsers = "http://139.177.182.18:8000/users/";
  public static hostAdmin = "http://139.177.182.18:8000/admin/";

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(AdminService.hostUsers + "get-users");
  }

  public deleteSpecificUser(userId: Number): Observable<any>{
    return this.http.delete(AdminService.hostAdmin + `/delete-user/${userId}`);
  }

  public getUser(userId: Number): Observable<UserItem> {
    return this.http.get<UserItem>(AdminService.hostUsers + `/get-user/${userId}`);
  }

  public backupPhotos(): Observable<any> {
    return this.http.get(AdminService.hostAdmin + "/create-backup-photos");
  }
}
