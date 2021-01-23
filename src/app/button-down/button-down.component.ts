import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button-down',
  templateUrl: './button-down.component.html',
  styleUrls: ['./button-down.component.css'],
})
export class ButtonDownComponent implements OnInit {
  constructor() {}
  @Input() elementHeight: number;

  ngOnInit(): void {}

  goToBottom() {
    this.elementHeight = this.elementHeight + 4000;
    window.scrollTo({ top: this.elementHeight, behavior: 'smooth' });
  }
}
