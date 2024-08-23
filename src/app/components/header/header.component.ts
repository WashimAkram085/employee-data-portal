import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userRole: string = 'User';

  constructor(private router: Router, private searchservice : SearchService, private employeeservice : EmployeeService) {}

  ngOnInit(): void {
    // Logic to determine if the user is an admin or a regular user
    // This can be fetched from a service or local storage
    //const role = localStorage.getItem('role');
    //this.userRole = role ? role : 'User';
    this.userRole = this.employeeservice.getLoggedInUser().role.toUpperCase();
  }

  logout(): void {
    // Logic to handle logout
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  search : string = '';

  onsearch() {
    this.searchservice.updateSearch(this.search);
    console.log(this.search);
  }
}
