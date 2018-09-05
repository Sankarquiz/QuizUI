import { Component, OnInit, OnChanges } from '@angular/core';
import { QuizDefinition, RegistrationFields } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-set-registration',
  templateUrl: 'registerquiz.component.html'
})
export class RegisterQuizComponent implements OnInit {

  quizDefinition: QuizDefinition;
  result: Observable<any>;
  form: any;  
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Type something. Test the Editor... ヽ(^。^)丿',
    translate: 'no'
  };

  constructor(private _saveRegistration: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router) { }
 
  ngOnInit() {
    
    this.quizDefinition = this.formDataService.getQuizDefinition();

    if (this.quizDefinition.stage == "Define") {
      this.quizDefinition.registrationFields.isTeamName = true;
      this.quizDefinition.registrationFields.isEmail = true;
      this.quizDefinition.registrationFields.isValidateEmail = true;
      this.quizDefinition.registrationFields.isContestantName = true;
      this.quizDefinition.registrationFields.isPhone = true;
      this.quizDefinition.registrationFields.isContact = true;
    }
  }

  SaveRegistration() {
    debugger;
    this.quizDefinition.stage = "Registration";
    this.quizDefinition.status = "Pending";
    this._saveRegistration.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => {
        this.result = result;
        if (result) {
          this.formDataService.setQuizDefinition(this.quizDefinition);
          this.formDataService.setRegistrationFields(this.quizDefinition.registrationFields);
          this.router.navigate(['/admin/setpagequiz']);
        } else {
          alert('Something went wrong. Please Try again.');
        }
      });
  }
}
