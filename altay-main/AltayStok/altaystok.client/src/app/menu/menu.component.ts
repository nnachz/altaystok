import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isUser(): boolean {
    return this.authService.isUser();
  }
}
