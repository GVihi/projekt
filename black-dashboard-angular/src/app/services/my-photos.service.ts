import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserItem } from "./../models/user-item";
import { PhotoItem } from "./../models/photo-item";

@Injectable({
  providedIn: 'root'
})
export class MyPhotosService {

  public static hostPhotos = "http://139.177.182.18:8000/photos/";

  constructor(private http: HttpClient) { }

  public getUsersPhotos(userId: Number): Observable<PhotoItem[]> {
    return this.http.get<PhotoItem[]>(MyPhotosService.hostPhotos + `/${userId}`)
  }
}
