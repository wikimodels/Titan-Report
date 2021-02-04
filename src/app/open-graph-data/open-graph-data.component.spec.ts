import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenGraphDataComponent } from './open-graph-data.component';

describe('OpenGraphDataComponent', () => {
  let component: OpenGraphDataComponent;
  let fixture: ComponentFixture<OpenGraphDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenGraphDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenGraphDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
