import {
  Directive,
  ElementRef,
  OnChanges,
  Input,
  Renderer2,
  SimpleChanges,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[focusColumn]',
})
export class FocusDirective {
  @Input() highlightColor = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
