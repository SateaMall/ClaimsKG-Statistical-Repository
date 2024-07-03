import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByTopicComponent } from './by-topic.component';

describe('ByTopicComponent', () => {
  let component: ByTopicComponent;
  let fixture: ComponentFixture<ByTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByTopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ByTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
