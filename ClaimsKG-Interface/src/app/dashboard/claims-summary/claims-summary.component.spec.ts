import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsSummaryComponent } from './claims-summary.component';

describe('ClaimsSummaryComponent', () => {
  let component: ClaimsSummaryComponent;
  let fixture: ComponentFixture<ClaimsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimsSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClaimsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
