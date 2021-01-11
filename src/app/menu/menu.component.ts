import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QUESTION_DISPLAY, RESPONDENTS } from 'consts/routes.consts';
import { DeviceDetectorService } from 'ngx-device-detector';
import { QuestionnaireService } from '../services/questionnaire.service';
import { LoadingService } from '../services/shared/loading.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  constructor(
    public questionnaireService: QuestionnaireService,
    private router: Router,
    public deviceDetectorService: DeviceDetectorService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.loadingOn();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 0);
  }
  goToQuestionDisplay(question_id: number) {
    this.router.navigate([QUESTION_DISPLAY + '/' + question_id]);
  }

  goToRespondents() {
    this.router.navigate([RESPONDENTS]);
  }
}
