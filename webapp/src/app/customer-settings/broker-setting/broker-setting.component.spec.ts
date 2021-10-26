import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerSettingComponent } from './broker-setting.component';

describe('BrokerSettingComponent', () => {
  let component: BrokerSettingComponent;
  let fixture: ComponentFixture<BrokerSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
