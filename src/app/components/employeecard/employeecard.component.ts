import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employeecard',
  templateUrl: './employeecard.component.html',
  styleUrls: ['./employeecard.component.scss']
})
export class EmployeecardComponent implements OnInit {
  
    employees : any[] = [];
    //data for user
    filteredEmployees : any[] = [];

    //loggin user data
    loggedUser : any = { role : 'User', department : 'HR'};
  
    constructor(private http : HttpClient, private router : Router, private employeeservice : EmployeeService) { }
    ngOnInit(): void {
      this.employeeservice.getEmployees().subscribe({
        next : (data) => {
          this.employees = data;
          this.filteredEmployees = this.employees.filter((employee) => employee.department === this.loggedUser.department);
          console.log(this.employees);
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
