import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userRole: string = 'User';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Logic to determine if the user is an admin or a regular user
    // This can be fetched from a service or local storage
    const role = localStorage.getItem('role');
    this.userRole = role ? role : 'User';
  }

  logout(): void {
    // Logic to handle logout
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
