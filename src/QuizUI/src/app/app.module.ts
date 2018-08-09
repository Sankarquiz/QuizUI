import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HeaderComponent } from './header/header.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { QuizBankComponent } from './quiz-bank/quiz-bank.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { CreateQuizComponent } from './quiz-builder/create-quiz/create-quiz.component';
import { ViewPreviousQuizComponent } from './quiz-builder/view-previous-quiz/view-previous-quiz.component';
import { RegistrationComponent } from './quiz-builder/registration/registration.component';
import { SetTheQuizComponent } from './quiz-builder/set-the-quiz/set-the-quiz.component';
import { PublishQuizComponent } from './quiz-builder/publish-quiz/publish-quiz.component';
import { DefineTheQuizComponent } from './quiz-builder/define-the-quiz/define-the-quiz.component';
import { FooterComponent } from './footer/footer.component';
import { PublishQuizMainContentComponent } from './quiz-builder/publish-quiz-main-content/publish-quiz-main-content.component';
import { SetPagesComponent } from './quiz-builder/set-pages/set-pages.component';
import { QuizDetailsService } from './services/service-getquizdetails';
import { HttpClientModule } from '@angular/common/http';
import { FormDataService } from './models/formData.service';
import { SetLogosComponent } from './quiz-builder/set-logos/set-logos.component';
import { CreateAccountComponent } from './quiz-builder/create-account/create-account.component';
import { MainAddsComponent } from './main-adds/main-adds.component';
import { AddsDescComponent } from './adds-desc/adds-desc.component';
import { NewUserRegComponent } from './new-user-reg/new-user-reg.component';
import { SetLogosGroupComponent } from './quiz-builder/set-logos-group/set-logos-group.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuizRunnerComponent } from './quiz-runner/quiz-runner.component';
import { QuizHeaderComponent } from './quiz-runner/quiz-header/quiz-header.component';
import { QuizRunnerContentComponent } from './quiz-runner/quiz-runner-content/quiz-runner-content.component';
import { QuizFinisherComponent } from './quiz-runner/quiz-finisher/quiz-finisher.component';

const appRoutes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'quiz-bank', component: QuizBankComponent },
  { path: 'adds', component: MainAddsComponent },
  { path: 'adds-desc', component: AddsDescComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'user-registration', component: NewUserRegComponent },
  { path: 'quiz-runner', component: QuizRunnerComponent },
  { path: 'quiz-finisher', component: QuizFinisherComponent },
  {
    path: 'quiz-header', component: QuizHeaderComponent,
    children: [
      {
        path: 'quiz-runner-content',
        component: QuizRunnerContentComponent
      },
    ] 
  },

  {
    path: 'quiz-builder',  component: QuizBuilderComponent,
    children: [
      {
        path: 'create-quiz',
        component: CreateQuizComponent,
        children: [
          {
            path: 'define-the-Quiz',
            component: DefineTheQuizComponent
          },
          {
            path: 'Registration',
            component: RegistrationComponent
          },
          {
            path: 'set-pages',
            component: SetPagesComponent
          },
          {
            path: 'set-logos-group',
            component: SetLogosGroupComponent
          },
          {
            path: 'set-the-quiz',
            component: SetTheQuizComponent
          },
          {
            path: 'publish-quiz',
            component: PublishQuizComponent,
            children: [
              {
                path: 'first-quiz',
                component: PublishQuizMainContentComponent
              },
            ]
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'define-the-Quiz'
          },
        ]
      },
      {
        path: 'view-previous-quiz',
        component: ViewPreviousQuizComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view-previous-quiz'
      },
      
    ]
  },
  {
    path: '',
    redirectTo: '/adds',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutUsComponent,
    QuizBankComponent,
    QuizBuilderComponent,
    CreateQuizComponent,
    ViewPreviousQuizComponent,
    DefineTheQuizComponent,
    RegistrationComponent,
    SetTheQuizComponent,
    PublishQuizComponent,
    FooterComponent,
    PublishQuizMainContentComponent,
    SetPagesComponent,
    MainAddsComponent,
    AddsDescComponent,
    NewUserRegComponent,
    SetLogosComponent,
    CreateAccountComponent,
    SetLogosGroupComponent,
    QuizRunnerComponent,
    QuizHeaderComponent,
    QuizRunnerContentComponent,
    QuizFinisherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    QuizDetailsService,
    FormDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
