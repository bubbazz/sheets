import { EventEmitter, Injectable, Input, OnInit, Output } from "@angular/core";

@Injectable()
export abstract class Copy<T> implements OnInit {
    @Input()
    abstract selection: T;
    @Output() abstract selectionChange: EventEmitter<T>;

    constructor() {
    }
    ngOnInit(): void {
        this.update()
    }

    update() {
        this.selectionChange.emit(this.selection);
        console.log("update");

    }
}