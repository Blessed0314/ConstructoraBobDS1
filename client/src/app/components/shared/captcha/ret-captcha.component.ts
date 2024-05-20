import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-ret-captcha',
  templateUrl: './ret-captcha.component.html',
  styleUrl: './captcha.component.css',
})
export class RetCaptchaComponent {
  constructor(private recaptchaV3Service: ReCaptchaV3Service,
              private authService: AuthService
  ) {
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
      this.authService.sendToken(token);
    });
  }

}
