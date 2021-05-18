import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  counter(i: number) {
    return new Array(i);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
