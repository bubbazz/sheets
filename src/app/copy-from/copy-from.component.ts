import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { constoption } from '../const-options';
import { Copy } from "../copy";

@Component({
  selector: 'app-copy-from',
  templateUrl: './copy-from.component.html',
  styleUrls: ['./copy-from.component.css']
})
export class CopyFromComponent extends Copy<constoption | string> implements OnChanges {
  @Input('mandant-sheet-select') mandantsheet!: string[];
  tmp: string[] = [];
  @Input()
  selection!: constoption | string;
  @Output() selectionChange = new EventEmitter();
  error = { is: true, selection: '' };

  constructor() {
    super()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selection && this.selection === "")
      this.selection = this.mandantsheet[0];
    if (changes.mandantsheet) {
      this.tmp = [];
      this.mandantsheet.forEach(e => this.tmp.push(e));
      this.error.is = true;
      for (let index = 0; index < this.tmp.length; index++) {
        if (this.tmp[index] === this.selection) {
          this.error.is = false;
          break
        }
      }
      if (this.error.is) {
        this.error.selection = this.selection;
        this.tmp.push(this.selection);
      }
    }
  }
  update() {
    this.error.is = this.error.selection === this.selection;
    super.update()
  }
}