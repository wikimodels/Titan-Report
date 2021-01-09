import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongodbChartComponent } from './mongodb-chart.component';

describe('MongodbChartComponent', () => {
  let component: MongodbChartComponent;
  let fixture: ComponentFixture<MongodbChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MongodbChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MongodbChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
