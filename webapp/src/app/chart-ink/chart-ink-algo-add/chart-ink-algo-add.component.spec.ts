import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInkAlgoAddComponent } from './chart-ink-algo-add.component';

describe('ChartInkAlgoAddComponent', () => {
  let component: ChartInkAlgoAddComponent;
  let fixture: ComponentFixture<ChartInkAlgoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartInkAlgoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartInkAlgoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
