import { Component, ViewChild } from '@angular/core';
import { RegisterQuizComponent } from './registerquiz.component';


@Component({
  selector: 'app-create-quiz',
  templateUrl: 'createquiz.component.html'
})
export class CreateQuizComponent {
  @ViewChild('myChild') private myChild: RegisterQuizComponent;
  constructor() { }

}
