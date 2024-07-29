import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7110/api/auth';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  createUser(username: string, password: string, role: string): Observable<any> {
    const user = { username, password, role };
    return this.http.post(`${this.apiUrl}/create`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUser/${userId}`);
  }

  updatePassword(updatePasswordData: { userId: number, newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/updatePassword`, updatePasswordData);
  }
}
