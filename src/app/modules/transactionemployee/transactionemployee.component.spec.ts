import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionemployeeComponent } from './transactionemployee.component';

describe('TransactionemployeeComponent', () => {
  let component: TransactionemployeeComponent;
  let fixture: ComponentFixture<TransactionemployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionemployeeComponent]
    });
    fixture = TestBed.createComponent(TransactionemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
