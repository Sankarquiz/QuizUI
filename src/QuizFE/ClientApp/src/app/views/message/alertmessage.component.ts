import { Component, OnInit, OnChanges, ViewChild, HostListener, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-message',
  templateUrl: 'alertmessage.component.html'
})
export class AlertMessageComponent  {
  @ViewChild('infoModal') modal;
  @Input() alertTitle: string;
  @Input() alertMessage: string;
  @Output() alertClose: EventEmitter<string> = new EventEmitter<string>();

  ShowMessage() {
    this.modal.show();    
  }
  HideMessage() {
    this.modal.hide();    
  }

  AlertClose() {
    this.HideMessage();
    this.alertClose.emit();
  }
  
}