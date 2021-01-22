import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import * as defaults from './../../assets/utils/defaults.json';
@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
})
export class TooltipComponent implements OnInit, AfterViewInit {
  ngTooltip = 'tooltip';
  tooltipText: string;
  @ViewChild('tt', { static: false }) mytooltip: NgbTooltip;

  constructor(private scrollDispatcher: ScrollDispatcher) {
    this.scrollDispatcher.scrolled().subscribe((x) => {
      this.mytooltip.close();
    });
  }

  ngOnInit() {
    this.tooltipText = defaults.tooltipText;
  }

  ngAfterViewInit() {
    this.mytooltip.open();
  }
}
