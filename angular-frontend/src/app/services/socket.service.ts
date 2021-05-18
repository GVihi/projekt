import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

const backendUrl = 'http://139.177.182.18:3001';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {
  }

  socket = io(backendUrl);

  public sendMessage(message: any) {
    this.socket.emit('data', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      console.log(message)
    });

    return this.message$.asObservable();
  };

}
