import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  next: Boolean = false;
  formValues1;
  formValues2;

  onSubmit(e, form: NgForm) {
    e.preventDefault();
    this.formValues1 = form.value;
    this.authService.checkID(form.value.id);
    if (
      !this.authService.isIdUnique &&
      form.value.password === form.value.passwordconfirm
    ) {
      alert('User With this ID already exists');
    }
    if (
      form.value.password !== form.value.passwordconfirm &&
      !this.authService.isIdUnique
    ) {
      alert('must be same password');
    }
    if (
      form.value.password === form.value.passwordconfirm &&
      this.authService.isIdUnique
    ) {
      this.next = true;
    }
  }
  onSubmit2(e, form: NgForm) {
    e.preventDefault();
    console.log(form.value);
    this.formValues2 = form.value;

    this.authService.createUser(
      this.formValues1.email,
      this.formValues1.password,
      this.formValues1.id,
      this.formValues2.city,
      this.formValues2.street,
      this.formValues2.name,
      this.formValues2.lastName
    );
  }
  constructor(public authService: AuthService) {}

  ngOnInit() {}
}
