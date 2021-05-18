import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.getNewMessage().subscribe((message: string) => {
      console.log(message);
    })
  }

  sendMessage() {
    this.socketService.sendMessage("sadsds");
  }

}
