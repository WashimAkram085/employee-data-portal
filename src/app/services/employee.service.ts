import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'http://localhost:3000/user';

  constructor(private http : HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteEmployee(id : number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // get login user details
  private loggedInUser: any = null;

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

}
