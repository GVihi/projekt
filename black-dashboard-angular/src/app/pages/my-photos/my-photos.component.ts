import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { PhotoItem } from '../../models/photo-item';
import { MyPhotosService } from 'src/app/services/my-photos.service';
import { Router } from '@angular/router';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.scss']
})
export class MyPhotosComponent implements OnInit {

  selectedFile: ImageSnippet;
  photos: PhotoItem[] = [];
  

  constructor(private photoService: PhotoService, private myPhotosService: MyPhotosService, private router: Router) { }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any, title: String, description: String) {
    console.log(title + " " + description);
    const idUser = localStorage.getItem("userId");
    var userId: number = +idUser;
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.photoService.uploadPhoto(this.selectedFile.file, userId, title, description).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

  getPhotos(userId: Number): void {
    this.myPhotosService.getUsersPhotos(userId).subscribe(photos => {
      photos.forEach((photo) => {

        console.log(photo.title + " " + photo.description);

        var path = photo.path;
        var splitted = path.split("/");
        let finalPath = "http://139.177.182.18:8000/";
        if (splitted[1] == "home") {
          finalPath += splitted[4];
          finalPath += "/";
          finalPath += splitted[5];
        } else {
          finalPath += path;
        }
        const photoItem = new PhotoItem(photo.idPhoto, photo.title, finalPath, photo.date, photo.description, photo.longitude, photo.latitude);
        this.photos.push(photoItem)

      })
    });
  }

  deletePhoto(idPhoto: Number): void {
    this.photoService.deletePhoto(idPhoto).subscribe(response => console.log(response));
  }

  ngOnInit(): void {
    const idUser = localStorage.getItem("userId");
    var userId: number = +idUser;
    this.getPhotos(userId);
  }

}
