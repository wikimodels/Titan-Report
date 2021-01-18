import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENU } from 'consts/routes.consts';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { Question, Respondents } from 'src/models/questionnaire.model';
import { LoadingService } from '../services/shared/loading.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, AfterViewInit {
  @Input() question: Question;
  @Input() respondents: Respondents;
  constructor(
    private router: Router,
    public loadingService: LoadingService,
    public deviceDetector: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    this.loadingService.loadingOn();
  }
  goHome() {
    this.router.navigate([MENU]);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 2000);
  }
}
