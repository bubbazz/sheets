import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSeriesComponent } from './work-series.component';

describe('WorkSeriesComponent', () => {
  let component: WorkSeriesComponent;
  let fixture: ComponentFixture<WorkSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
