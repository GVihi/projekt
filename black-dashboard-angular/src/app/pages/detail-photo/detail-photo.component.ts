import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { PhotoItem } from '../../models/photo-item';
import { PhotoService } from '../../services/photo.service';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-detail-photo',
  templateUrl: './detail-photo.component.html',
  styleUrls: ['./detail-photo.component.scss']
})
export class DetailPhotoComponent implements OnInit {

  photo: PhotoItem;
  idPhoto: Number;
  constructor(private photoService: PhotoService, private router: Router, private route: ActivatedRoute) {

  }

  getPhotoData(): void {
    this.route.params.subscribe((params: Params) => {
      this.idPhoto = params.photoId;
      this.photoService.getPhotoById(this.idPhoto).subscribe((photo) => {
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
        const photoItem = new PhotoItem(photo.idPhoto, photo.title, finalPath, photo.date);
        this.photo = photoItem

      });
    });
  }

  ngOnInit(): void {
    this.getPhotoData();
    console.log(this.photo)

  }

  download(photoId: Number) {
    this.photoService.downloadPhoto(photoId).subscribe(data => fileSaver.saveAs(data, this.photo.title.toString()),
      error => console.error(error));
  }

}
