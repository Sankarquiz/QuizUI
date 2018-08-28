import { Component, Input, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: 'createquiz.component.html'
})
export class CreateQuizComponent implements OnInit {
  @Input() htab: number;
  @Input() isFromHeader: boolean = false;
  constructor(private formDataService: FormDataService, private router: Router, ) {
  }
  ngOnInit() {
    if (!this.isFromHeader) {
      this.formDataService.Clear();
      this.router.navigate(['/dash/adminquiz/definequiz']);
    }
  }
}
