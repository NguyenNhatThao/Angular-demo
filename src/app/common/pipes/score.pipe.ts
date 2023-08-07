import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreStatusPipe',
})
export class ScoreStatusPipe implements PipeTransform {
  transform(value: number, args?: any[]): String {
    if (value >= 0 && value < 5) {
      return value.toString() + ' (Fail)';
    } else if (value >= 5 && value <= 10) {
      return value.toString() + ' (Pass)';
    } else {
      return value.toString() + ' (Invalid)';
    }
  }
}
