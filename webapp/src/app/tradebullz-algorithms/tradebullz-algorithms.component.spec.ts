import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradebullzAlgorithmsComponent } from './tradebullz-algorithms.component';

describe('TradebullzAlgorithmsComponent', () => {
  let component: TradebullzAlgorithmsComponent;
  let fixture: ComponentFixture<TradebullzAlgorithmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradebullzAlgorithmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradebullzAlgorithmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
