import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbaseComponent } from './adminbase.component';

describe('AdminbaseComponent', () => {
  let component: AdminbaseComponent;
  let fixture: ComponentFixture<AdminbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminbaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
