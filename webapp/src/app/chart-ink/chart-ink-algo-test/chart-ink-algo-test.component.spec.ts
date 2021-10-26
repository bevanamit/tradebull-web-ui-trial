import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInkAlgoTestComponent } from './chart-ink-algo-test.component';

describe('ChartInkAlgoTestComponent', () => {
  let component: ChartInkAlgoTestComponent;
  let fixture: ComponentFixture<ChartInkAlgoTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartInkAlgoTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartInkAlgoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
