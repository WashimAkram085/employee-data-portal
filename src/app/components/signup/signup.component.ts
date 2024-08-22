import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      department: ['', [Validators.required]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  toggleRole(): void {
    this.isAdmin = !this.isAdmin;
    //this.signupForm.patchValue({ role: this.isAdmin ? 'admin' : 'user' });
  }

  onSubmit() {
    console.log(this.signupForm.value);if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log('Form Data:', formData);
      // Handle form submission logic here
    }
  }
}
