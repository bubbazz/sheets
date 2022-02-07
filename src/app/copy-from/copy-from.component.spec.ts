import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyFromComponent } from './copy-from.component';

describe('CopyFromComponent', () => {
  let component: CopyFromComponent;
  let fixture: ComponentFixture<CopyFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
