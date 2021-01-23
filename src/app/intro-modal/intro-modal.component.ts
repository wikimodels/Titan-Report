import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MongodbChartComponent } from '../mongodb-chart/mongodb-chart.component';

@Component({
  selector: 'app-intro-modal',
  templateUrl: './intro-modal.component.html',
  styleUrls: ['./intro-modal.component.css'],
})
export class IntroModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<IntroModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  checked = false;

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
