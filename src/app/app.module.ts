import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SheetComponent } from './sheet/sheet.component';
import { CopyFromComponent } from './copy-from/copy-from.component';
import { CopyConstComponent } from './copy-const/copy-const.component';
import { WorkSeriesComponent } from './work-series/work-series.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkplaceComponent } from './workplace/workplace.component';
@NgModule({
  declarations: [
    AppComponent,
    SheetComponent,
    CopyFromComponent,
    CopyConstComponent,
    WorkSeriesComponent,
    WorkplaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
