import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByEntityByTopicComponent } from './by-entity-by-topic.component';

describe('ByEntityByTopicComponent', () => {
  let component: ByEntityByTopicComponent;
  let fixture: ComponentFixture<ByEntityByTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByEntityByTopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ByEntityByTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
