import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyConstComponent } from './copy-const.component';

describe('CopyConstComponent', () => {
  let component: CopyConstComponent;
  let fixture: ComponentFixture<CopyConstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyConstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyConstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
