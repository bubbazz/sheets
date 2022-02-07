import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubjectConfig } from "rxjs/webSocket";

export type SocketComponents = { type: string, data: any };

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  config: WebSocketSubjectConfig<SocketComponents> = {
    url: "ws://localhost:8000/",
    openObserver: { next: (v) => console.log("connection is open") },
    closeObserver: { next: (v) => console.log("connection closed") },
    serializer: (s) => JSON.stringify(s),
    deserializer: (e) => JSON.parse(e.data)
  }
  /* 
    deserializer(event: MessageEvent<any>): File;
    deserializer(event: MessageEvent<any>): string[];
    deserializer(event: MessageEvent<any>): SocketComponents {
      return JSON.parse(event.data)
    }
   */
  private wsocket = webSocket<SocketComponents>(this.config);
  //private wsocket = WebSocket(this.url);
  constructor() {
  }

  getSocket(): Subject<SocketComponents> {
    return this.wsocket;
  }
}
