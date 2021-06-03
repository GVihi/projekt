import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { PhotoItem } from '../../models/photo-item';
import { CommentItem } from '../../models/comment-item';
import { PhotoService } from '../../services/photo.service';
import * as fileSaver from 'file-saver';

declare var ol: any;

@Component({
  selector: 'app-detail-photo',
  templateUrl: './detail-photo.component.html',
  styleUrls: ['./detail-photo.component.scss']
})
export class DetailPhotoComponent implements OnInit {

  photo: PhotoItem;
  idPhoto: Number;
  comments: CommentItem[] = [];

  latitude = 51.678418;
  longitude = 7.809007;
  locationChosen = false;

  map: any;

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
        const photoItem = new PhotoItem(photo.idPhoto, photo.title, finalPath, photo.date, photo.description);
        this.photo = photoItem

      });
    });
  }

  ngOnInit(): void {
    this.getPhotoData();
    this.getComments();
    var iconFeature1 = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.1526069, 51.4790309]),),
      name: 'Somewhere',
    });

    var iconFeature2 = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.1426069, 51.4840309])),
      name: 'Somewhere else'
    });

    // specific style for that one point
    iconFeature2.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/200px-Map_marker_font_awesome.svg.png',
      })
    }));




    const iconLayerSource = new ol.source.Vector({
      features: [iconFeature1, iconFeature2]
    });

    const iconLayer = new ol.layer.Vector({
      source: iconLayerSource,
      // style for all elements on a layer
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://openlayers.org/en/v4.6.4/examples/data/icon.png'
        })
      })
    });


    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        iconLayer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([-0.1526069, 51.4790309]),
        zoom: 15
      })
    });
  }

  download(photoId: Number) {
    this.photoService.downloadPhoto(photoId).subscribe(data => fileSaver.saveAs(data, this.photo.title.toString()),
      error => console.error(error));
  }

  getComments(): void {
    this.route.params.subscribe((params: Params) => {
      this.idPhoto = params.photoId;
      this.photoService.getComments(this.idPhoto).subscribe(comments => this.comments = comments);
    });
  }

  postComment(content: String): void {
    console.log(content);
    this.route.params.subscribe((params: Params) => {
      this.idPhoto = params.photoId;
      const idUser = localStorage.getItem("userId");
      var userId: number = +idUser;
      this.photoService.postComment(content, userId, this.idPhoto).subscribe(response => console.log(response));
    });
  }



  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }

}
