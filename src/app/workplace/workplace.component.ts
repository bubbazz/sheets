import { Component, OnInit } from '@angular/core';
import { Series } from '../sheet/sheet.component';
import { SocketComponents, WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.css']
})
export class WorkplaceComponent implements OnInit {

  constructor(private websocketService: WebsocketService) { }

  excon_lst: string[] = ["excon", "list"];
  mandant_lst: string[] = ["mandant", "list"];
  SheetsQue: Sheets[] = [];
  selectedSeries?: Series[];
  json_lst: string[] = [];
  input = ""

  ngOnInit(): void {
    this.getData();
    this.addSheet();
    this.updateSheet(0);
  }
  saveFormat(): void {
    //Todo 2-Way binding for [()] select typed values
    let jsonObj = { name: this.input, data: this.SheetsQue };
    let send = { type: "save", data: jsonObj };
    this.websocketService.getSocket().next(send);
  }
  loadFormat() {
    let inputSetter = true;
    for (let index = 0; index < this.json_lst.length; index++)
      if (this.json_lst[index] === this.input) {
        let send = { type: "open", data: this.input };
        this.websocketService.getSocket().next(send);
        inputSetter = false;
      }
    if (inputSetter)
      this.input = ""
  }
  logMe() {
    console.log(this.SheetsQue)
  }
  create() {
    let send = { type: "create", data: this.SheetsQue };
    this.websocketService.getSocket().next(send);
  }
  addSheet() {
    this.SheetsQue.push({ name: "Sheet " + (this.SheetsQue.length + 1), series: [] });
  }
  updateSheet(index: number) {
    this.selectedSeries = this.SheetsQue[index].series
  }
  getData(): void {
    this.websocketService.getSocket().subscribe((wb_data: SocketComponents) => {
      if (wb_data.type === "excon_lst")
        this.excon_lst = (wb_data.data as string[]);
      else if (wb_data.type === "mandant_lst")
        this.mandant_lst = (wb_data.data as string[]);
      else if (wb_data.type === "open") {
        this.SheetsQue = (wb_data.data as Sheets[])
      }
      else if (wb_data.type === "open_lst")
        this.json_lst = (wb_data.data as string[])
    });
  }
}
interface Sheets {
  name: string
  series: Series[]
}