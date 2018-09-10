import { Component } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { QuizDetailsService } from '../../services/service-getquizdetails';
@Component({
  selector: 'app-registerbulk',
  templateUrl: 'registerbulk.component.html',
})
export class RegisterBulkComponent {
  arrayBuffer: any;
  file: File;
  bulkoutput: any;
  spinner: boolean = false;
  isuploaded: string = '';
  constructor(private _registerService: QuizDetailsService) {
    this.isuploaded = '';
  }


  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    this.spinner = true;
    this.isuploaded = '';
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.bulkoutput = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      if (!this.bulkoutput[0].Email && !this.bulkoutput[0].Password && !this.bulkoutput[0].TeamName
        && !this.bulkoutput[0].QuizName && !this.bulkoutput[0].QuizTYPE) {
        this.spinner = false;
        this.isuploaded = "Data in Excel in not valid."
        return;
      }
      this._registerService.RegisterBulk(this.bulkoutput)
        .subscribe((result: any) => {
          if (result) {
            this.isuploaded = "Saved Successfully.";
          }
          else {
            this.isuploaded = "Something wrong. Please verify the excel data.";
          }
          this.spinner = false;
        });
    }
    fileReader.readAsArrayBuffer(this.file);
  }
}
