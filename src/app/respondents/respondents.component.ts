import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-respondents',
  templateUrl: './respondents.component.html',
  styleUrls: ['./respondents.component.css'],
})
export class RespondentsComponent implements OnInit {
  constructor(private deviceService: DeviceDetectorService) {}
  width: number;
  height: number;
  ngOnInit(): void {
    if (this.deviceService.isMobile()) {
      this.width = window.innerWidth;
      this.height = this.width;
    } else {
      this.width = 640;
      this.height = 480;
    }
  }
}
