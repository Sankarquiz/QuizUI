import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debug } from 'util';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-set-logos',
  templateUrl: 'setlogoquiz.component.html'
})
export class SetLogoQuizComponent implements OnInit {
  @Output() imagePath = new EventEmitter();
  @Output() image = new EventEmitter();
  imageselectlocation: any;
  imagetextlocation: FormControl = new FormControl();
  @Input() inputimagepath: string;
  constructor() { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.image.emit(<File>event.target.files[0]);
  }

  //onTextChanged(event) {
  //  debugger;
  //  this.imagePath.emit(event.target.value);
  //}
}
