import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debug } from 'util';
@Component({
  selector: 'app-set-logos',
  templateUrl: './set-logos.component.html',
  styleUrls: ['./set-logos.component.css']
})
export class SetLogosComponent implements OnInit {
  @Output() imagePath = new EventEmitter();
  @Output() image = new EventEmitter();
  imageselectlocation: any;
  imagetextlocation: FormControl = new FormControl();

  constructor() { }

  ngOnInit() {
    //this.imageselectlocation.valueChanges
    //  .subscribe(next => {
    //    this.image.emit(this.imageselectlocation)
    //  });

    //this.imagetextlocation.valueChanges
    //  .subscribe(next => {
    //    this.imagePath.emit(this.imagetextlocation.value)
    //  });
  }

  onFileSelected(event) {
    //debugger;
    //this.imageselectlocation = event.target.value;
    debugger;
    this.image.emit(<File>event.target.files[0]);
  }

  onTextChanged(event) {
    debugger;
    this.imagePath.emit(event.target.value);
  }
}
