import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { HeaderComponent } from './header/header.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { QuizBankComponent } from './quiz-bank/quiz-bank.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { RouterModule, Routes } from '@angular/router';
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
<<<<<<< HEAD
import { FormDataService } from './models/formData.service';

const appRoutes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'quiz-bank', component: QuizBankComponent },
  {
    path: 'quiz-builder', component: QuizBuilderComponent,
    children: [
      {
        path: 'create-quiz',
=======
import { SetLogosComponent } from './quiz-builder/set-logos/set-logos.component';
import { CreateAccountComponent } from './quiz-builder/create-account/create-account.component';



const appRoutes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'quiz-bank',      component: QuizBankComponent },
  { path: 'adds',      component: MainAddsComponent },
  { path: 'adds-desc',      component: AddsDescComponent },
  { path: 'create-account',      component: CreateAccountComponent },
  { path: 'user-registration',      component: NewUserRegComponent },
  { path: 'quiz-builder',      component: QuizBuilderComponent, 
  children: [                          
    {
        path:'create-quiz',
>>>>>>> origin/Dev
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
            path: 'set-logos',
            component: SetLogosComponent
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
        ]
      },
      {
        path: 'view-previous-quiz',
        component: ViewPreviousQuizComponent
      },
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HeaderComponent, AboutUsComponent, QuizBankComponent, QuizBuilderComponent, CreateQuizComponent, ViewPreviousQuizComponent, DefineTheQuizComponent, RegistrationComponent, SetTheQuizComponent, PublishQuizComponent, FooterComponent, PublishQuizMainContentComponent, SetPagesComponent,
=======
    HeaderComponent,AboutUsComponent,QuizBankComponent,QuizBuilderComponent, CreateQuizComponent, ViewPreviousQuizComponent,  DefineTheQuizComponent, RegistrationComponent, SetTheQuizComponent, PublishQuizComponent, FooterComponent, PublishQuizMainContentComponent, SetPagesComponent, MainAddsComponent, AddsDescComponent, NewUserRegComponent, SetLogosComponent, CreateAccountComponent,
>>>>>>> origin/Dev
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [QuizDetailsService, FormDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
