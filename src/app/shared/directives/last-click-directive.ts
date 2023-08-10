import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[lastClickDirec]',
})
export class LastClickDirective {
  private clickSubject = new Subject<void>();

  @Output() lastClick = new EventEmitter<void>();

  constructor() {
    this.clickSubject.pipe(debounceTime(300)).subscribe(() => {
      this.lastClick.emit();
    });
  }

  @HostListener('click')
  onClick() {
    this.clickSubject.next();
  }
}
