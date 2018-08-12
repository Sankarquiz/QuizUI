import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  constructor(private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    if (!this.formDataService.getUserData().teamName || this.formDataService.getUserData().role != 'admin') {
      this.router.navigate(['/user-registration'])
    }
  }
}
