import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { constoption, CONSTOPTION_LST } from '../const-options';
import { Copy } from '../copy';

@Component({
  selector: 'app-copy-const',
  templateUrl: './copy-const.component.html',
  styleUrls: ['./copy-const.component.css']
})
export class CopyConstComponent extends Copy<constoption | string> implements OnInit {
  @Output() selected = new EventEmitter();
  @Input()
  selection!: constoption | string
  @Output() selectionChange = new EventEmitter();

  constructor() {
    super()
  }
  constlist: constoption[] = CONSTOPTION_LST;
  update(): void {
    let value;
    switch (this.selection) {
      default:
      case constoption.year:
        this.selection = constoption.year
        value = new Date().getFullYear();
        break;
      case constoption.lastDayMonth:
        value = new Date();
        value.setDate(0);
        value = value.getDate();
        break;
    }
    this.selected.emit(value);
    super.update();
  }

}
