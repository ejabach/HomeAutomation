import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {User} from "./user";
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationService {
  private loginUrl = 'api/user/auth';

  public user: User;

  constructor(private http: Http) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  loginAttempt(username: string, password: string): Observable<boolean>
  {
    console.log('Login attempt\n\tusername: %s\n\tpw: %s', username, password);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.loginUrl, {username: username, password: password}, options)
      .map((res: Response) => {
        let data = res.json();
        console.log('Extracted data: ', data);
        let user = new User(data.username, data.isAdmin, data.token);
        if (user)
        {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  isLoggedIn(): boolean
  {
    return !!this.user;
  }

  logout()
  {
    this.user = null;
    localStorage.setItem('user', null);
    console.log('Logout\n\tuser: %s\n\tLogged in: %s', JSON.parse(localStorage.getItem('user')), this.isLoggedIn());

  }

  private handleError(res: Response)
  {
    console.error(res);
    return Observable.throw(res);
  }
}
