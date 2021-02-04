import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { GlobalObjectService } from '../services/shared/global-object.service';

@Component({
  selector: 'app-button-down',
  templateUrl: './button-down.component.html',
  styleUrls: ['./button-down.component.css'],
})
export class ButtonDownComponent implements OnInit {
  windowRef: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    windowService: GlobalObjectService
  ) {
    this.windowRef = windowService.getWindow();
  }
  buttonClass = 'glow-on-hover';
  @Input() elementHeight: number;

  ngOnInit(): void {}

  goToBottom() {
    this.buttonClass = '';
    this.elementHeight = this.elementHeight + 4000;
    if (isPlatformBrowser(this.platformId)) {
      this.windowRef.scrollTo({ top: this.elementHeight, behavior: 'smooth' });
    }
  }
}
