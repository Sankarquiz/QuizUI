import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';

@Component({
  selector: 'activate-user-signup',
  templateUrl: 'activateusersignup.component.html'
})

export class ActivateUserSignupComponent {

  param: string;

  constructor(private activate: QuizDetailsService,
    private router: Router,
    private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.param = params['param'];
    });

    if (this.param) {
      this.activate.ActivateSignup(this.param)
        .subscribe((res: any) => {
          this.router.navigate(['/login']);
        });
    }
    else {
      alert("Invalid URL");
    }
  }
}
