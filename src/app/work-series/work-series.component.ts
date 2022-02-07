import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { constoption } from '../const-options';
import { SocketComponents, WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-work-series',
  templateUrl: './work-series.component.html',
  styleUrls: ['./work-series.component.css']
})
export class WorkSeriesComponent implements OnInit {

  @Input('mandant-sheet-select') mandantsheet!: string[];
  @Input('series')
  workingQue: SeriesItem[] = [];
  @Input()
  input!: string;
  @Output()
  inputChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }
  private addItem(item: SeriesItem) {
    this.workingQue.push(item);
    this.input += "§" + this.workingQue.length + "§";
    this.inputChange.emit(this.input);
  }
  addCopyFromConst() {
    let item: SeriesItem = {
      type: "const",
      key: constoption.lastDayMonth,
      value: {}
    }
    this.addItem(item);
  }
  addCopyFromSheet() {
    let item: SeriesItem = {
      type: "sheet",
      key: "",
      value: {}
    }
    this.addItem(item);
  }
  update = () => this.inputChange.emit(this.input);
  changeConst = (value: any, index: any) => this.workingQue[index].value = value;
}

export interface SeriesItem {
  type: string,
  key: string | constoption,
  value: any
}