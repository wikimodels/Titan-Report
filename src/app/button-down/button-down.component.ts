import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button-down',
  templateUrl: './button-down.component.html',
  styleUrls: ['./button-down.component.css'],
})
export class ButtonDownComponent implements OnInit {
  constructor() {}
  buttonClass = 'button-pulsar';
  @Input() elementHeight: number;

  ngOnInit(): void {}

  goToBottom() {
    this.buttonClass = '';
    this.elementHeight = this.elementHeight + 4000;
    window.scrollTo({ top: this.elementHeight, behavior: 'smooth' });
  }
}
