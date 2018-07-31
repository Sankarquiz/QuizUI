import { Component, Input } from '@angular/core';
import { FormDataService }  from './models/formData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() formData;
  //@Input() registrationData;
  //@Input() sponserData;
  //@Input() questionData;
    
    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
    //alert('jsjsj');
        this.formData = this.formDataService.getFormData(); 
       // this.registrationData  = this.formDataService.getRegistrationData();
        //this.sponserData = this.formDataService.getSponsorData();
        //this.questionData = this.formDataService.getQuestionData();
    //alert('jsjsj-2');      
    }
} 
