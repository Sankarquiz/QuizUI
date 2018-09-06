import { Component, OnInit, Output } from '@angular/core';
import { QuizDefinition, SponsorDetail } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';
import { FormDataService } from '../../models/formData.service';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { isUndefined } from 'util';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-set-logogroup',
  templateUrl: 'setlogogroupquiz.component.html'
})
export class SetLogoGroupQuizComponent implements OnInit {
  quizDefinition: QuizDefinition;
  sponsor;
  result: Observable<any>;
  imagename: string = '';
  spinner: boolean = false;
  topleft: string = '';
  topright: string = '';
  topmiddle: string = '';
  leftmiddle: string = '';
  rightmiddle: string = '';
  bottomleft: string = '';
  bottomright: string = '';
  bottommiddle: string = '';

  constructor(private _saveQuizData: QuizDetailsService, private router: Router, private formDataService: FormDataService) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.sponsor = this.formDataService.getSponserFields();
    if (this.quizDefinition.sponsorList) {
      this.BindSponsorImage();
    }
  }

  BindSponsorImage() {
    if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'topleft').length > 0) {
      this.topleft = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'topleft').path;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'topright').length > 0) {
      this.topright = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'topright').path;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'topmiddle').length > 0) {
      this.topmiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'topmiddle').path;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'leftmiddle').length > 0) {
      this.leftmiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'leftmiddle').path;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'rightmiddle').length > 0) {
      this.rightmiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'rightmiddle').path;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'bottomleft').length > 0) {
      this.bottomleft = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'bottomleft').path;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'bottomright').length > 0) {
      this.bottomright = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'bottomright').path;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'bottommiddle').length > 0) {
      this.bottommiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'bottommiddle').path;
    }
  }

  SaveImage(image, location) {
    this.spinner = true;
    const fd = new FormData();
    var extn = image.name.split(".").pop();
    this.imagename = this.quizDefinition.quizName + "_" + this.quizDefinition.quizType + "_" + location;
    if (!isUndefined(extn))
      this.imagename = this.imagename + "." + extn;

    fd.append("file", image, this.imagename);
    this._saveQuizData.UploadImage(fd)
      .subscribe((res: any) => {
        if (res) {
          this.sponsor = new SponsorDetail();
          this.sponsor.position = location;
          this.sponsor.imageName = this.imagename;
          this.sponsor.path = res.fullpath;
          if (this.quizDefinition.sponsorList.filter(x => x.position == location).length > 0) {
            let index = this.quizDefinition.sponsorList.findIndex(x => x.position == location);
            let updatesponsor = this.quizDefinition.sponsorList.find(x => x.position == location);
            updatesponsor.imageName = this.imagename;
            updatesponsor.path = res.fullpath;
            this.quizDefinition.sponsorList[index] = updatesponsor;
          }
          else {
            this.quizDefinition.sponsorList.push(this.sponsor);
          }
          this.BindSponsorImage();
          this.spinner = false;
        }
      });
  }

  //SavePath(path, location) {
  //  debugger;
  //  this.sponsor = new SponsorDetail();
  //  this.sponsor.path = path;
  //  this.sponsor.position = location;
  //  if (this.quizDefinition.sponsorList.filter(x => x.position == location).length > 0) {
  //    let index = this.quizDefinition.sponsorList.findIndex(x => x.position == location);
  //    let updatesponsor = this.quizDefinition.sponsorList.find(x => x.position == location);
  //    updatesponsor.path = path;
  //    this.quizDefinition.sponsorList[index] = updatesponsor;
  //  }
  //  else {
  //    this.quizDefinition.sponsorList.push(this.sponsor);
  //  }
  //}

  SaveSponsorDetails() {
    this.quizDefinition.stage = "SetLogo";
    this.quizDefinition.status = "Pending";
    this._saveQuizData.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => {
        this.result = result;
        if (result) {
          if (result.message) {
            alert(result.message);
            return;
          }
          this.formDataService.setSponserFields(this.quizDefinition.sponsorList);
          this.formDataService.setQuizDefinition(this.quizDefinition);
          this.router.navigate(['/admin/setquestionquiz']);
        } else {
          alert('Something went wrong. Please Try again.');
        }
      });
  }
}
