import { Injectable } from '@angular/core';

import { QuizDefinition, QuizSet, RegistrationFields } from './QuizDefinition';

@Injectable()
export class FormDataService {

    private formData: QuizDefinition = new QuizDefinition();  
    constructor() { 
    }

    getQuizDefinition(): QuizDefinition {  
        // Return the Quiz data
        var quizDefinition: QuizDefinition = {
          QuizName : this.formData.QuizName,
          QuizDomainHost : this.formData.QuizDomainHost,
          QuizType : this.formData.QuizType,
          NoOfQuestions : this.formData.NoOfQuestions,
          NoOfParticipants : this.formData.NoOfParticipants,
          QuizDurationHour :this.formData.QuizDurationHour,
          QuizDurationTime : this.formData.QuizDurationTime,
          QuizStartDate:this.formData.QuizStartDate,
          QuizStartDateTime:this.formData.QuizStartDateTime,
          QuizEndDate:this.formData.QuizEndDate,
          QuizEndDateTime:this.formData.QuizEndDateTime, 
          ShuffleQuestions:this.formData.ShuffleQuestions,
          IsQuizFromLargerPool:this.formData.IsQuizFromLargerPool,
          NoOfQuestionsInPool:this.formData.NoOfQuestionsInPool,
          AllowConcurrentAccess:this.formData.AllowConcurrentAccess,
          ParticipantType:this.formData.ParticipantType,
          IsQuizAutoEvaluate:this.formData.IsQuizAutoEvaluate,
          ShowScoreAfterAttempt:this.formData.ShowScoreAfterAttempt,
          PostScoreOnSocialMedia:this.formData.PostScoreOnSocialMedia,
          Status : this.formData.Status,
          Stage : this.formData.Stage
        };
        return quizDefinition;
    }

    setQuizDefinition(data: QuizDefinition) {  
         this.formData.QuizName = data.QuizName;
         this.formData.QuizDomainHost= data.QuizDomainHost;
         this.formData.QuizType= data.QuizType;
         this.formData.NoOfQuestions= data.NoOfQuestions;
         this.formData.NoOfParticipants= data.NoOfParticipants;
         this.formData.QuizDurationHour= data.QuizDurationHour;
         this.formData.QuizDurationTime= data.QuizDurationTime;
         this.formData.QuizStartDate= data.QuizStartDate;
         this.formData.QuizStartDateTime= data.QuizStartDateTime;
         this.formData.QuizEndDate= data.QuizEndDate;
         this.formData.QuizEndDateTime= data.QuizEndDateTime;
         this.formData.ShuffleQuestions= data.ShuffleQuestions;
         this.formData.IsQuizFromLargerPool= data.IsQuizFromLargerPool;
         this.formData.NoOfQuestionsInPool= data.NoOfQuestionsInPool;
         this.formData.AllowConcurrentAccess= data.AllowConcurrentAccess;
         this.formData.ParticipantType= data.ParticipantType;
         this.formData.IsQuizAutoEvaluate= data.IsQuizAutoEvaluate;
         this.formData.ShowScoreAfterAttempt= data.ShowScoreAfterAttempt;
         this.formData.PostScoreOnSocialMedia= data.PostScoreOnSocialMedia; 
    }

    
    getQuizSet() : QuizSet { 
        var quizSet: QuizSet = { 
            QuizName: this.formData.QuizName,
            QuizType: this.formData.QuizType,
            QuestionNo: this.formData.QuestionNo,
            QuestionText: this.formData.QuestionText,
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
        this.formData.QuizName = data.QuizName;
        this.formData.QuizType= data.QuizType;
        this.formData.QuestionNo= data.QuestionNo;
        this.formData.QuestionText= data.QuestionText;
        this.formData.ImageUrl= data.ImageUrl;
        this.formData.AnswerType= data.AnswerType;
        this.formData.Answer= data.Answer;
        this.formData.Score= data.Score;
        this.formData.Option1= data.Option1;
        this.formData.Option2= data.Option2;
        this.formData.Option3= data.Option3;
        this.formData.Option4= data.Option4; 
    }

    getRegistrationFields() : RegistrationFields { 
        var quizRegistrationFields: RegistrationFields = { 
            QuizName: this.formData.QuizName,
            QuizType: this.formData.QuizType,
            TeamName: this.formData.TeamName,
            EmailId: this.formData.EmailId,
            ValidateEmail: this.formData.ValidateEmail,
            ContestantName: this.formData.ContestantName,
            PhoneNumber: this.formData.PhoneNumber,
            ContactAddress: this.formData.ContactAddress 
        };
        return quizRegistrationFields;
    }

    setRegistrationFields (data: RegistrationFields) { 
        this.formData.QuizName = data.QuizName;
        this.formData.QuizType= data.QuizType;
        this.formData.TeamName= data.TeamName;
        this.formData.EmailId= data.EmailId;
        this.formData.ValidateEmail= data.ValidateEmail;
        this.formData.ContestantName= data.ContestantName;
        this.formData.PhoneNumber= data.PhoneNumber;
        this.formData.ContactAddress= data.ContactAddress 
    } 

    getFormData(): QuizDefinition { 
        return this.formData;
    }
    } 
}
