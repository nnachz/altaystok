import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: response => {
        if (response.token) {
          this.authService.setToken(response.token);
          this.checkRole(); // Rol kontrolünü burada yapıyoruz
          this.router.navigate(['/stock']);
        }
      },
      error: err => {
        console.error('Login error:', err);
        this.message = 'Username or password wrong.';
      }
    });
  }

  checkRole(): void {
    const role = this.authService.getRole();
    console.log('Current Role:', role); // Rolü burada yazdırıyoruz
    if (this.authService.isAdmin()) {
      console.log('Admin olarak giriş yapıldı.');
    } else if (this.authService.isUser()) {
      console.log('User olarak giriş yapıldı.');
    } else {
      console.log('Giriş yapılmadı.');
    }
  }
}
