import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Chart } from 'chart.js';
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
  public imagePath;
  results: any;
  selectedFile: ImageSnippet;
  imgURL: any;
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
    this.imagePath = imageInput.files;
    reader.readAsDataURL(imageInput.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.photoService.classifyImage(this.selectedFile.file, 12).subscribe(
        (res) => {
          this.onSuccess();
          console.log(res)
          this.results = res;
          this.createChart(res.score, res.class);
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

  ngOnInit(): void {

  }

  createChart(score, predictedClass) {


    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontSize = 16;

    var data = {
      labels: ["Score difference", "Matching score"],
      datasets: [
        {
          fill: true,
          backgroundColor: [
            'white',
            '#32a852'],
          data: [100 - score, score],
          // Notice the borderColor 
          borderColor: ['black', 'black'],
          borderWidth: [2, 2]
        }
      ]
    };

    var options = {
      responsive: true,
      title: {
        display: true,
        text: 'Given image belongs to class ' + predictedClass,
        position: 'top'
      },
      rotation: -0.7 * Math.PI
    };

    var myBarChart = new Chart('barChart', {
      type: 'pie',
      data: data,
      options: options
    });
  }

}
