import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph6Component } from './graph6.component';

describe('Graph6Component', () => {
  let component: Graph6Component;
  let fixture: ComponentFixture<Graph6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graph6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Graph6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
