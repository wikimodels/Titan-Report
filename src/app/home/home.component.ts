import { Component, OnInit } from '@angular/core';
import { TestDataService } from '../services/test-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private testS: TestDataService) {}

  ngOnInit(): void {}
  generateTestData() {
    this.testS.getUserInfo();
  }
}
