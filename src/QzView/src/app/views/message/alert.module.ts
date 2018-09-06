import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertMessageComponent } from './alertmessage.component';

@NgModule({
  declarations: [
    AlertMessageComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    AlertModule.forRoot(),
  ],
  exports: [
    AlertMessageComponent,
  ]
})
export class AlertMessageModule {}
