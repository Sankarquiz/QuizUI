import { Component, OnInit, Output } from '@angular/core';
import { QuizDefinition, SponsorDetail } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';
import { FormDataService } from '../../models/formData.service';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { isUndefined } from 'util';
@Component({
  selector: 'app-set-logos-group',
  templateUrl: './set-logos-group.component.html',
  styleUrls: ['./set-logos-group.component.css']
})
export class SetLogosGroupComponent implements OnInit {

  quizDefinition: QuizDefinition;
  sponsor;
  result: Observable<any>;
  imagename: string = '';
  constructor(private _saveQuizData: QuizDetailsService, private router: Router, private formDataService: FormDataService) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.sponsor = this.formDataService.getSponserFields();
  }

  SaveImage(image, location) {
    debugger;
    const fd = new FormData();
    var extn = image.name.split(".").pop();
    this.imagename = this.quizDefinition.quizName + "_" + this.quizDefinition.quizType + "_" + location;
    if (!isUndefined(extn))
      this.imagename = this.imagename + "." + extn;

    fd.append("file", image, this.imagename);
    this._saveQuizData.UploadImage(fd)
      .subscribe((res) => {
        if (res) {
          this.sponsor = new SponsorDetail();
          this.sponsor.position = location;
          this.sponsor.imageName = this.imagename;
          if (this.quizDefinition.sponsorList.filter(x => x.position == location).length > 0) {
            let index = this.quizDefinition.sponsorList.findIndex(x => x.position == location);
            let updatesponsor = this.quizDefinition.sponsorList.find(x => x.position == location);
            updatesponsor.imageName = this.imagename;
            this.quizDefinition.sponsorList[index] = updatesponsor;
          }
          else {
            this.quizDefinition.sponsorList.push(this.sponsor);
          }
        }
      });
  }

  SavePath(path, location) {
    debugger;
    this.sponsor = new SponsorDetail();
    this.sponsor.path = path;
    this.sponsor.position = location;
    if (this.quizDefinition.sponsorList.filter(x => x.position == location).length > 0) {
      let index = this.quizDefinition.sponsorList.findIndex(x => x.position == location);
      let updatesponsor = this.quizDefinition.sponsorList.find(x => x.position == location);
      updatesponsor.path = path;
      this.quizDefinition.sponsorList[index] = updatesponsor;
    }
    else {
      this.quizDefinition.sponsorList.push(this.sponsor);
    }
  }

  SaveSponsorDetails(sponsordetail) {
    debugger;
    this.quizDefinition.stage = "SetLogo";
    this.quizDefinition.status = "Pending";
    this._saveQuizData.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => {
        this.result = result;
        if (result) {
          this.formDataService.setSponserFields(this.quizDefinition.sponsorList);
          this.formDataService.setQuizDefinition(this.quizDefinition);
          this.router.navigate(['/quiz-builder/create-quiz/set-the-quiz']);
        } else {
          alert('Not Saved.');
        }
      });
  }
}
