import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getChartUrl } from '../../../consts/chartDisplays/chart-url';
@Pipe({
  name: 'mongo',
})
export class MongoPipe implements PipeTransform {
  constructor(private dom: DomSanitizer) {}
  transform(chartId: any): any {
    const dirtyUrl = getChartUrl(chartId);
    const cleanUrl = this.dom.bypassSecurityTrustResourceUrl(dirtyUrl);
    return cleanUrl;
  }
}
