import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router'; 
import { QuizDefinition } from '../../models/QuizDefinition';
import { FormDataService }  from '../../models/formData.service';

@Component({
  selector: 'app-define-the-quiz',
  templateUrl: './define-the-quiz.component.html',
  styleUrls: ['./define-the-quiz.component.css']
})
export class DefineTheQuizComponent implements OnInit {

  quizDefinition : QuizDefinition;
  form: any;
  constructor(private router: Router,private formDataService: FormDataService) { }

  ngOnInit() {
        this.quizDefinition = this.formDataService.getQuizDefinition();
       // console.log('Quiz Definition feature loaded!', this.quizDefinition);
  }
  saveDefinequiz(form: any){
   
    this.formDataService.setQuizDefinition(this.quizDefinition);
    this.router.navigate(['/quiz-builder/create-quiz/Registration']); 
  }
} 
