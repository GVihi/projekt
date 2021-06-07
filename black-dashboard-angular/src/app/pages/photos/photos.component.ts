import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoItem } from '../../models/photo-item';
import { PhotoService } from '../../services/photo.service';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {


  photos: PhotoItem[] = [];
  host = PhotoService.host;

  constructor(private photoService: PhotoService, private router: Router) { }

  getPhotosData(): void {
    this.photoService.getPhotos().subscribe(photos => {
      photos.forEach((photo) => {
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
    }

    );
  }


  ngOnInit(): void {
    this.getPhotosData();
    console.log(this.photos);
  }

}
