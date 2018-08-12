import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    //this.formDataService.Clear();
  }
}
