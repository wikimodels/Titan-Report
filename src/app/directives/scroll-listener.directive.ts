import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollListener]',
})
export class ScrollListenerDirective {
  top;
  offSetHeight;
  scrollHeight;

  constructor(private eleRef: ElementRef) {}

  @HostListener('scroll') onScroll(event) {
    console.log('HEY!!! 1');
    //Get the Value of scroll position
    this.top = this.eleRef.nativeElement.scrollTop;
    //Get the Height of the Element.This property normally  include padding and margin
    this.offSetHeight = this.eleRef.nativeElement.offsetHeight;
    // ScrollHeight is a measurement of the height of an element's content including
    this.scrollHeight = this.eleRef.nativeElement.scrollHeight;
    // content not visible on the screen due to overflow
    //  console.log('Top:'+this.top,'Scroll height:'+this.eleRef.nativeElement.scrollHeight,'offsetHEight:'+this.offSetHeight);
    //IF the scroll position is zero which means it is at the top
    if (this.top === 0) {
      console.log('HEY!!! top');
    }
    //check the scroll at bottom or top
    if (this.top > this.scrollHeight - this.offSetHeight - 1) {
      console.log('HEY!!! bottom');
    }
  }
}
