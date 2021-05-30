import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-reverse-search',
  templateUrl: './reverse-search.component.html',
  styleUrls: ['./reverse-search.component.scss']
})
export class ReverseSearchComponent implements OnInit {


  selectedFile: ImageSnippet;

  constructor(private photoService: PhotoService) { }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.photoService.reverseSearch(this.selectedFile.file, 12).subscribe(
        (res) => {
          this.onSuccess();
          console.log(res)
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
  }

}
