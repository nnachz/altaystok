import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7110/api/auth';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getRole(): string | null {
    const token = this.getToken();
    console.log('Token:', token); 
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log('Decoded Token:', decodedToken); 
    return decodedToken ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isUser(): boolean {
    return this.getRole() === 'User';
  }
  
  logout(): void {
    localStorage.removeItem('token');
  }
}
