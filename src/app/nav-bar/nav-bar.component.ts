import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENU } from 'consts/routes.consts';
import { QuestionDisplay } from 'src/models/question-display';
import { LoadingService } from '../services/shared/loading.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, AfterViewInit {
  @Input() questionDisplay: QuestionDisplay;
  constructor(private router: Router, public loadingService: LoadingService) {}

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
