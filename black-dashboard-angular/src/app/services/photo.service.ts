import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PhotoItem } from './../models/photo-item';
import { CommentItem } from './../models/comment-item';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public static host = `http://139.177.182.18:8000/photos`;
  public static reverseHost = `http://139.177.182.18:8000/reverse-search`;

  constructor(private http: HttpClient) { }

  public getPhotos(): Observable<PhotoItem[]> {
    return this.http.get<PhotoItem[]>(PhotoService.host);
  }

  public getPhotoById(photoId: Number): Observable<PhotoItem> {
    return this.http.get<PhotoItem>(PhotoService.host + `/details/${photoId}`);
  }

  public uploadPhoto(image: File, userId: Number, title: String, description: String): Observable<any> {
    const formData = new FormData();
    let t: string = title as string;
    let desc: string = description as string;
    formData.append('title', t);
    formData.append('file', image);
    formData.append('description', desc);

    return this.http.post(PhotoService.host + `/${userId}`, formData);
  }

  public reverseSearch(image: File, userId: Number): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post(PhotoService.reverseHost + `/${userId}`, formData);
  }

  public downloadPhoto(photoId: Number): Observable<any> {
    return this.http.get(PhotoService.host + `/download/${photoId}`, { responseType: 'blob' });
  }

  public getComments(photoId: Number): Observable<CommentItem[]> {
    return this.http.get<CommentItem[]>(PhotoService.host + `/${photoId}/comments`);
  }

  public postComment(comment: String, userId: Number, photoId: Number): Observable<any> {
    return this.http.post(PhotoService.host + `/${photoId}/comment/${userId}`, {comment: comment});
  }

}
