import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debug } from 'util';
//import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-set-logos',
  templateUrl: './set-logos.component.html',
  styleUrls: ['./set-logos.component.css']
})
export class SetLogosComponent implements OnInit  {
  @Output() imagePath = new EventEmitter();
  imageselectlocation: FormControl = new FormControl();
  imagetextlocation: FormControl = new FormControl();
  constructor() { }

  ngOnInit() {
    this.imageselectlocation.valueChanges
      // .debounceTime(5000)
      .subscribe(next => {
        this.imagePath.emit(this.imageselectlocation.value)
      });

    this.imagetextlocation.valueChanges
      //.debounceTime(5000)
      .subscribe(next => {
        this.imagePath.emit(this.imagetextlocation.value)
      });
  }

  onFileChanged(event) {
    debugger;
    this.imageselectlocation = event.target.value;
  }

  onTextChanged(event) {
    debugger;
    this.imagetextlocation = event.target.value;
  }
}
