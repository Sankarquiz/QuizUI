import { Component, OnInit, Output } from '@angular/core';
import { QuizDefinition, SponsorDetail } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';
import { FormDataService } from '../../models/formData.service';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-set-logos-group',
  templateUrl: './set-logos-group.component.html',
  styleUrls: ['./set-logos-group.component.css']
})
export class SetLogosGroupComponent implements OnInit {

  quizDefinition: QuizDefinition;
  sponsor;
  result: Observable<any>;
  @Output() originCode = new EventEmitter();
  constructor(private _saveQuizData: QuizDetailsService, private router: Router, private formDataService: FormDataService) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.sponsor = this.formDataService.getSponserFields();
  }
  SaveLogo(path, location) {
    debugger;
    this.sponsor = new SponsorDetail();
    this.sponsor.Path = path;
    this.sponsor.Position = location;
    this.quizDefinition.SponsorList.push(this.sponsor);
  }

  SaveSponsorDetails(sponsordetail) {
    debugger;
    this.quizDefinition.Stage = "SetLogo";
    this.quizDefinition.Status = "Pending";
    this._saveQuizData.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => { this.result = result });

    if (this.result) {
      this.formDataService.setQuizDefinition(this.quizDefinition);
      this.router.navigate(['/quiz-builder/create-quiz/set-the-quiz']);
    } else {
      alert('Not Saved.');
    }
  }
}
