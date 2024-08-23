import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-employeecard',
  templateUrl: './employeecard.component.html',
  styleUrls: ['./employeecard.component.scss']
})
export class EmployeecardComponent implements OnInit {
  
    employees : any[] = [];
    //data for user
    filteredEmployees : any[] = [];
    loggedInUser : any;

    //loggin user data
  
    constructor(private http : HttpClient, private router : Router, private employeeservice : EmployeeService) { }
    ngOnInit(): void {
      //getting logged in user
      this.loggedInUser = this.employeeservice.getLoggedInUser();

      this.employeeservice.getEmployees().subscribe({
        next : (data) => {
          this.employees = data;
          if(this.loggedInUser.role === 'admin') {
            this.filteredEmployees = this.employees;
          }else if(this.loggedInUser.role === 'user') {
            this.filteredEmployees = this.employees.filter((employee) => employee.department === this.loggedInUser.department);
          }
          console.log(this.filteredEmployees);
        },
        error : (error) => {
          console.error(error);
        }
      });

      
    }

    deleteUser(id : number) {
      this.employeeservice.deleteEmployee(id).subscribe({
        next : (data) => {
          console.log(data);
          this.employees = this.employees.filter((employee) => employee.id !== id);
        },
        error : (error) => {
          console.error(error);
        }
      });

    }


    
}
