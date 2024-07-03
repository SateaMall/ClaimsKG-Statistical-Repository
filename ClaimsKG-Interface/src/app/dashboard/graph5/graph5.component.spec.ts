import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph5Component } from './graph5.component';

describe('Graph5Component', () => {
  let component: Graph5Component;
  let fixture: ComponentFixture<Graph5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graph5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Graph5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
