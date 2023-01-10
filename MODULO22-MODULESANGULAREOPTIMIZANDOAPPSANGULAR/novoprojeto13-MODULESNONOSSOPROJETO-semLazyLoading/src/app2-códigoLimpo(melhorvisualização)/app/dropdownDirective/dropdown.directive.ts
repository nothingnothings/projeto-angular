import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  
  isCollapsed: string = 'closed';


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    
  }

  @HostListener('click') mouseClick(eventData: Event) {

    if (this.isCollapsed === 'closed') {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
      this.isCollapsed = 'open';

    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
      this.isCollapsed = 'closed';
    }
  }
}












// export class DropdownDirective {  //versão do professor, mais elegante...

//   @HostBinding('class.open') isOpen = false;


// @HostListener('click') toggleOpen() {


//       this.isOpen = !this.isOpen;

// }
// }

