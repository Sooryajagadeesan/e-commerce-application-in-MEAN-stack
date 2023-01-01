import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentfailureComponent } from './paymentfailure.component';

describe('PaymentfailureComponent', () => {
  let component: PaymentfailureComponent;
  let fixture: ComponentFixture<PaymentfailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentfailureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentfailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
