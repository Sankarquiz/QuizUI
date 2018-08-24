import { Component, ViewChild, Input } from '@angular/core';
import { RegisterQuizComponent } from './registerquiz.component';


@Component({
  selector: 'app-create-quiz',
  templateUrl: 'createquiz.component.html'
})
export class CreateQuizComponent {
  @ViewChild('myChild') private myChild: RegisterQuizComponent;
   @Input() htab: number;
  constructor() {
   // this.tab = 1;
  }

}
