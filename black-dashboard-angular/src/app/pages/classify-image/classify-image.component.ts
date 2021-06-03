import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-classify-image',
  templateUrl: './classify-image.component.html',
  styleUrls: ['./classify-image.component.scss']
})
export class ClassifyImageComponent implements OnInit {

  results: any;
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
      this.photoService.classifyImage(this.selectedFile.file, 12).subscribe(
        (res) => {
          this.onSuccess();
          console.log(res)
          this.results = res;
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
