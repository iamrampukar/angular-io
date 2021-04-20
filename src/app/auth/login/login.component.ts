import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _authService: AuthService
    , private _loginServie: LoginService
    , private _router: Router
  ) { }

  ngOnInit(): void {
    const self = this;
    // self.login();
  }

  public login(): void {
    const self = this;
    self._authService.fetchAll().subscribe(
      (res) => { },
      (error) => { },
      () => { }
    )
  }

  public doLogin(): void {
    const self = this;
    const params = {
      username: 'example@mail.com',
      password: 'example'
    };
    self._authService.userLogin(params).subscribe({
      next: (res) => {
        console.log('next fetch data...');
      },
      error: (error) => {
        console.log('error message show...');
      },
      complete: () => {
        console.log('all data complete...');
      }
    });
  }

  public doAccessToken(): void {
    const self = this;
    // accessToken: "77c7960e890deddebb7ff2e55e340d2ed1708368"
    // refreshToken: "ec388aeb4e6b36e5f838bd3a48b71d0203de511d"
    const params = {
      username: 'info@miracleinterface.com.np',
      password: 'someapplication',
      date: '2021-04-08'
    };
    self._authService.accessTokenValid(params).subscribe({
      next: (res) => {
        if (res.success) {
          localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
        } else {
          localStorage.setItem("ACCESS_TOKEN", res.data.refreshToken);
        }
      },
      error: (error) => {
      },
      complete: () => {
      }
    });
  }

  public onUnauthorize(): void {
    const self = this;
    const params = {
      email: 'info@miracleinterface.com.np',
      password: 'someapplication'
    };
    self._authService.doUnauthorize(params).subscribe({
      next: (res) => {
        debugger;
      },
      error: (error) => {
        debugger;
      },
      complete: () => {
        debugger;
      }
    });
  }

  public onLoginToken() {
    this._loginServie.login({
      email: 'info@miracleinterface.com.np',
      password: 'someapplication'
    }
    ).subscribe(success => {
      if (success) {
        debugger;
        this._router.navigate(['/secret-random-number']);
      }
    });
  }

}
