import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsQuestionComponent } from './charts-question.component';

describe('ChartsQuestionComponent', () => {
  let component: ChartsQuestionComponent;
  let fixture: ComponentFixture<ChartsQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
