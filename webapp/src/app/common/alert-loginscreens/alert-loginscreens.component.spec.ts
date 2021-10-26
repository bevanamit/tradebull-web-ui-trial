import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLoginscreensComponent } from './alert-loginscreens.component';

describe('AlertLoginscreensComponent', () => {
  let component: AlertLoginscreensComponent;
  let fixture: ComponentFixture<AlertLoginscreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertLoginscreensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertLoginscreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
