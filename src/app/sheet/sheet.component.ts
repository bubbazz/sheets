import { Component, Input, OnInit } from '@angular/core';
import { SocketComponents, WebsocketService } from '../websocket.service';

export type ConstantItem = { id: number, data: string };

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit {

  constructor(private websocketService: WebsocketService) { }
  @Input()
  excon_lst!: string[];
  @Input()
  mandant_lst!: string[];
  @Input('sheet')
  SeriesQue: Series[] = [];
  input: string = "";
  ngOnInit(): void {
  }
  filename = "Choose file"
  changeFile(filelist: FileList | null) {
    if (filelist == null || filelist.length == 0)
      return;
    this.filename = filelist[0]?.name;
  }
  sendData(filelist: FileList | null): void {
    if (filelist == null || filelist.length == 0)
      return;
    let freader = new FileReader()
    freader.onload = (ev => {
      let rawdataobj = { name: "" + filelist[0].name, data: ev.target?.result }
      let send = { type: "file", data: rawdataobj };
      this.websocketService.getSocket().next(send);
    }
    )
    freader.readAsDataURL(filelist[0]);
  }

  addSeries() {
    this.SeriesQue.push({ name: "select excon row", input: "", series: [] });
  }

}
export interface Series {
  name: string
  input: string
  series: any[]
}