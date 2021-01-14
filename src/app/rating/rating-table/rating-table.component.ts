import { Component, Input } from '@angular/core';
import { RatingDisplay } from 'src/models/rating-display/rating-displa';

@Component({
  selector: 'app-rating-table',
  templateUrl: './rating-table.component.html',
  styleUrls: ['./rating-table.component.css'],
})
export class RatingTableComponent {
  @Input() dataSource: RatingDisplay;
  constructor() {}
}
