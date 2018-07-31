import { Component, Input } from '@angular/core';
import { FormDataService }  from './models/formData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() formData;
    
    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
    //alert('jsjsj');
        this.formData = this.formDataService.getFormData();
    //alert('jsjsj-2');      
    }
} 
