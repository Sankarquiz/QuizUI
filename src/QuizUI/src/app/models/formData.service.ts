import { Injectable } from '@angular/core';

import { QuizDefinition, QuizSet } from './QuizDefinition';

@Injectable()
export class FormDataService {

    private formData: QuizDefinition = new QuizDefinition();  
    constructor() { 
    }

    getQuizDefinition(): QuizDefinition {  
        // Return the Quiz data
        var quizDefinition: QuizDefinition = {
          quizName : this.formData.quizName,
          hostQuizDomain : this.formData.hostQuizDomain,
          typeOfQuiz : this.formData.typeOfQuiz,
          noOfQuestion : this.formData.noOfQuestion,
          noOfParticipants : this.formData.noOfParticipants,
          durationHour :this.formData.durationHour,
          durationTime : this.formData.durationTime,
          quizStartDate:this.formData.quizStartDate,
          quizStartDateTime:this.formData.quizStartDateTime,
          quizEndDate:this.formData.quizEndDate,
          quizEndDateTime:this.formData.quizEndDateTime, 
          shufflleQuestions:this.formData.shufflleQuestions,
          quizFromLargerPool:this.formData.quizFromLargerPool,
          poolOfQuestions:this.formData.poolOfQuestions,
          allowConcurrentAccess:this.formData.allowConcurrentAccess,
          participantType:this.formData.participantType,
          autoEvaluateQuiz:this.formData.autoEvaluateQuiz,
          showScoreAfterattempt:this.formData.showScoreAfterattempt,
          postScore:this.formData.postScore
        };
        return quizDefinition;
    }

    setQuizDefinition(data: QuizDefinition) {  
         this.formData.quizName = data.quizName;
         this.formData.hostQuizDomain= data.hostQuizDomain;
         this.formData.typeOfQuiz= data.typeOfQuiz;
         this.formData.noOfQuestion= data.noOfQuestion;
         this.formData.noOfParticipants= data.noOfParticipants;
         this.formData.durationHour= data.durationHour;
         this.formData.durationTime= data.durationTime;
         this.formData.quizStartDate= data.quizStartDate;
         this.formData.quizStartDateTime= data.quizStartDateTime;
         this.formData.quizEndDate= data.quizEndDate;
         this.formData.quizEndDateTime= data.quizEndDateTime;
         this.formData.shufflleQuestions= data.shufflleQuestions;
         this.formData.quizFromLargerPool= data.quizFromLargerPool;
         this.formData.poolOfQuestions= data.poolOfQuestions;
         this.formData.allowConcurrentAccess= data.allowConcurrentAccess;
         this.formData.participantType= data.participantType;
         this.formData.autoEvaluateQuiz= data.autoEvaluateQuiz;
         this.formData.showScoreAfterattempt= data.showScoreAfterattempt;
         this.formData.postScore= data.postScore; 
    }

    
    getQuizSet() : QuizSet { 
        var quizSet: QuizSet = {
            quizName: this.formData.quizName,
            quizType: this.formData.quizType,
            questionNo: this.formData.questionNo,
            questionText: this.formData.questionText,
            ImageUrl: this.formData.ImageUrl,
            AnswerType: this.formData.AnswerType,
            Answer: this.formData.Answer,
            Score: this.formData.Score,
            Option1: this.formData.Option1,
            Option2: this.formData.Option2,
            Option3: this.formData.Option3,
            Option4:this.formData.Option4
        };
        return quizSet;
    }

    setQuizSet (data: QuizSet) { 
        this.formData.quizName = data.quizName;
        this.formData.quizType= data.quizType;
        this.formData.questionNo= data.questionNo;
        this.formData.questionText= data.questionText;
        this.formData.ImageUrl= data.ImageUrl;
        this.formData.AnswerType= data.AnswerType;
        this.formData.Answer= data.Answer;
        this.formData.Score= data.Score;
        this.formData.Option1= data.Option1;
        this.formData.Option2= data.Option2;
        this.formData.Option3= data.Option3;
        this.formData.Option4= data.Option4; 
    }
    getFormData(): QuizDefinition { 
        return this.formData;
    }
    } 
}
