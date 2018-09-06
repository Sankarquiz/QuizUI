import { Component, OnInit } from '@angular/core';
import { QuizDefinition, QuizSet, QuizQuestions } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { isUndefined } from 'util';

@Component({
  selector: 'app-set-question',
  templateUrl: 'setquestion.component.html'
})
export class SetQuestionComponent implements OnInit {
  quizDefinition: QuizDefinition;
  result: Observable<any>;
  currentQuestionNo: number = 0;
  previousQuestionNo;
  questionset = new QuizSet();
  questions = new QuizQuestions();
  disablePublish: boolean = true;
  iseditquestion: boolean = false;
  isimagesaved: boolean = true;
  max: number = 0;
  navs = ['Multiple Choice', 'Hangman', 'Free Text'];

  constructor(private _saveQuestion: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    this.AssignDefaultValues();
  }

  AssignDefaultValues() {
    this.iseditquestion = this.formDataService.getEditQuestion();
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.questions = this.formDataService.getQuizQuestions();
    this.max = (this.quizDefinition.isQuizFromLargerPool) ?
      this.quizDefinition.noOfQuestionsInPool :
      this.quizDefinition.noOfQuestions;

    if (!this.iseditquestion) {
      this.questionset.answerType = 'Multiple Choice';
      this.questionset.isImageneeded = false;
      ++this.currentQuestionNo;

      if (this.questions && this.questions.questions.filter(x => x.questionNo == this.currentQuestionNo).length > 0) {
        let index = this.questions.questions.findIndex(x => x.questionNo == this.currentQuestionNo);
        this.questionset = this.questions.questions[index];
      }
    }
    else {
      this.questionset = this.formDataService.getQuestion();
      this.currentQuestionNo = this.questionset.questionNo;
    }

    this.questionset.imagePathType = 'upload';
  }

  SaveQuestion() {
    if (!this.isimagesaved) {
      alert('Image not uploaded. Please upload again.')
      this.isimagesaved = true;
      return;
    }
    if (!this.iseditquestion) {
      this.questionset.questionNo = this.currentQuestionNo;
      if (this.questions.questions.filter(x => x.questionNo == this.currentQuestionNo).length > 0) {
        let index = this.questions.questions.findIndex(x => x.questionNo == this.currentQuestionNo);
        this.questions.questions[index] = this.questionset;
      }
      else {
        this.questions.questions.push(this.questionset);
      }
    }
    else {
      if (this.questions.questions.filter(x => x.questionNo == this.questionset.questionNo).length > 0) {
        let index = this.questions.questions.findIndex(x => x.questionNo == this.questionset.questionNo);
        this.questions.questions[index] = this.questionset;
        this.formDataService.setEditQuestion(false);
        this.Publish();
      }
    }
    this.questionset = new QuizSet();
    if (this.max <= this.currentQuestionNo) {
      this.disablePublish = false;
      this.Publish();
    }

    this.AssignDefaultValues();
  }

  Publish() {
    this.questions.quizName = this.quizDefinition.quizName;
    this.questions.quizType = this.quizDefinition.quizType;
    if (this.max <= this.currentQuestionNo || this.iseditquestion) {
      this._saveQuestion.SaveQuestion(this.questions)
        .subscribe((result: any) => { this.result = result });

      this.quizDefinition.stage = "SetQuestion";
      this.quizDefinition.status = "Pending";
      this._saveQuestion.SaveQuizData(this.quizDefinition)
        .subscribe((result: any) => { this.result = result });

      this.formDataService.setQuizQuestions(this.questions);
      this.formDataService.setQuizDefinition(this.quizDefinition);
      this.router.navigate(['/admin/publishquiz']);
    }
    else {
      alert('Please enter all questions. You entered' + this.currentQuestionNo + ' question so far.')
    }
  }

  PreviousQuestion() {
    this.currentQuestionNo--;
    let index = this.questions.questions.findIndex(x => x.questionNo == this.currentQuestionNo);
    this.questionset = this.questions.questions[index];
  }

  onFileSelected(event) {
    var extn = <File>event.target.files[0].name.split(".").pop();
    const fd = new FormData();
    let imgname = this.quizDefinition.quizName + "_" + this.quizDefinition.quizType + "_" + this.currentQuestionNo;
    if (!isUndefined(extn)) {
      imgname = imgname + "." + extn;
    }
    this.questionset.imageName = imgname;
    fd.append("file", <File>event.target.files[0], imgname);
    this._saveQuestion.UploadImage(fd)
      .subscribe((res: any) => {
        if (res) {
          this.questionset.imagePath = res.fullpath;
          this.isimagesaved = true;
        }
      });
  }
}
