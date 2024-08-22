import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  toggleRole(): void {
    this.isAdmin = !this.isAdmin;
  }



  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      if (this.isAdmin) {
        this.http.get<any[]>('http://localhost:3000/admin').subscribe({
          next: response => {
            const admin = response.find(admin => admin.email === formData.email && admin.password === formData.password);
            if (admin) {
              console.log("Admin Login Successfull");
              this.router.navigate(['/dashboard']);
            } else {
              console.log("Invalid Admin Credentials");
            }
          },
          error: error => {
            console.error('Login failed', error);
          }
        });
      }
      else {
        this.http.get<any[]>('http://localhost:3000/user').subscribe({
          next: response => {
            const user = response.find(user => user.email === formData.email && user.password === formData.password);
            if (user) {
              console.log("User Login Successfull");
              this.router.navigate(['/dashboard']);
            } else {
              console.log("Invalid User Credentials");
            }
          },
          error: error => {
            console.error('Login failed', error);
          }
        });

      }
    }
    else {
      console.log("Invalid Form")
      return;
    }
  }
  redirectToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
