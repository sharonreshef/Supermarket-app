import { Component, OnInit } from '@angular/core';
// import { FormControl, Validators, NgForm } from '@angular/forms';
// import { AuthService } from '../auth.service';
import {
  Validators,
  FormsModule,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { LoginModel } from 'src/app/core/models/auth/login.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.spinner.show();
    const { username, password } = this.loginForm.value;
    const loginModel = new LoginModel(username, password);
    this.authService.login(loginModel);
    // .subscribe(() => {
    //   this.spinner.hide();
    // });
    this.loginForm.reset();
  }
}
