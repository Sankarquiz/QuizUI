import { Component, OnInit, Input } from '@angular/core';
import { QuizDefinition, QuizSet } from '../../models/QuizDefinition';
import { FormDataService }  from '../../models/formData.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationData : QuizSet;
   quizDefinition : QuizDefinition;
  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
  //console.log(this.route.snapshot.queryParamMap.get('quizInfo'));
      this.quizDefinition = this.formDataService.getQuizDefinition();
        console.log('Quiz Definition on Registration Page', this.quizDefinition);
      this.registrationData = this.formDataService.getQuizSet();
        console.log('Quiz Set on Registration Page', this.registrationData);
  } 
  saveRegistration(form: any){   
    this.formDataService.setQuizSet(this.registrationData);
    this.router.navigate(['/quiz-builder/create-quiz/set-the-quiz']); 
  } 
}
