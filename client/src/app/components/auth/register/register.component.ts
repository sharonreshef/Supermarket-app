import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm1: FormGroup;
  registerForm2: FormGroup;
  next: Boolean = false;
  registerForm1Values;
  registerForm2Values;
  formValues2;

  async checkIdValue(id) {
    await this.authService.checkID(id);
    if (!this.authService.isIdUnique) {
      alert('User With this ID already exists');
      return;
    }
    return;
  }

  onSubmit() {
    this.registerForm1Values = this.registerForm1.value;
    this.checkIdValue(this.registerForm1Values.id);
    if (
      this.registerForm1Values.password !== this.registerForm1Values.password2
    ) {
      alert('must be same password');
    } else {
      this.next = true;
    }
  }
  onSubmit2() {
    this.registerForm2Values = this.registerForm2.value;

    this.authService.createUser(
      this.registerForm1Values.email,
      this.registerForm1Values.password,
      this.registerForm1Values.id,
      this.registerForm2Values.city,
      this.registerForm2Values.street,
      this.registerForm2Values.firstName,
      this.registerForm2Values.lastName
    );
  }
  constructor(public authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm1 = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password2: [null, [Validators.required, Validators.minLength(6)]],
      id: [null, [Validators.required, Validators.minLength(9)]]
    });
    this.registerForm2 = this.fb.group({
      city: [null, [Validators.required]],
      street: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    });
  }
}
