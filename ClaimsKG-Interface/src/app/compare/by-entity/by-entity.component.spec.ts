import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByEntityComponent } from './by-entity.component';

describe('ByEntityComponent', () => {
  let component: ByEntityComponent;
  let fixture: ComponentFixture<ByEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByEntityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ByEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
