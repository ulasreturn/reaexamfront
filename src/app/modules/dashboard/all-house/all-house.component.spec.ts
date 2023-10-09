import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHouseComponent } from './all-house.component';

describe('AllHouseComponent', () => {
  let component: AllHouseComponent;
  let fixture: ComponentFixture<AllHouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllHouseComponent]
    });
    fixture = TestBed.createComponent(AllHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
