import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInkComponent } from './chart-ink.component';

describe('ChartInkComponent', () => {
  let component: ChartInkComponent;
  let fixture: ComponentFixture<ChartInkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartInkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartInkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
