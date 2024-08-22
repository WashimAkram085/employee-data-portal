import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: ['user', [Validators.required]], // Default role is 'user'
      department: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  toggleRole(): void {
    this.isAdmin = !this.isAdmin;
    this.signupForm.patchValue({ role: this.isAdmin ? 'admin' : 'user' });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      if (formData.role === 'admin') {
        formData.department = 'admin';
        this.http.post('http://localhost:3000/admin', formData).subscribe({
          next: response => {
            console.log('Signup successful', response);
          },
          error: error => {
            console.error('Signup failed', error);
          }
        });
      } else {
        this.http.post('http://localhost:3000/user', formData)
          .subscribe({
            next: response => {
              console.log('Signup successful', response);
              //signup  successfull
            },
            error: error => {
              console.error('Signup failed', error);
              //signup error
            }
          });
      }
    } else {
      console.log('Form is invalid');
      return;
    }
  }
}
