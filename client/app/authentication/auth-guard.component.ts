import { Component } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Component({
  template: ''
})
export class AuthGuardComponent implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(): boolean
  {
    console.log('Can activate route? ', this.authService.isLoggedIn());
    if (this.authService.isLoggedIn())
    {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
