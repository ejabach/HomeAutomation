import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;

  loginFailed: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginFailed = false;
  }

  loginAttempt()
  {
    this.authService.loginAttempt(this.username, this.password)
      .subscribe(
        success => {
          console.log('Success: ', success);
          if (success)
          {
            this.router.navigate(['/dashboard']);
          } else {
            this.loginAttemptFailed();
          }
          success ? this.router.navigate(['/dashboard']) : this.loginAttemptFailed();
        },
        error => {
          console.error('Error: ', error);
          this.loginAttemptFailed();
        }
      );
  }

  private loginAttemptFailed()
  {
    this.loginFailed = true;
    this.password = '';
  }

  ngOnInit() {
  }
}
