import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  newUsername: string = '';
  newPassword: string = '';
  newRole: string = 'User';
  users: any[] = [];
  updatingUser: any = null;
  newPasswordForUpdate: string = '';
  confirmPasswordForUpdate: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  createUser(): void {
    if (this.newUsername && this.newPassword && this.newRole) {
      this.userService.createUser(this.newUsername, this.newPassword, this.newRole).subscribe(() => {
        this.loadUsers();
        this.newUsername = '';
        this.newPassword = '';
        this.newRole = 'User';
      });
    } else {
      alert('Tüm alanları doldurun.');
    }
  }

  deleteUser(userId: number): void {
    if (confirm('Kullanıcıyı silmek istediğinizden emin misiniz?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  
  startUpdatePassword(user: any): void {
    this.updatingUser = user;
    this.newPasswordForUpdate = '';
    this.confirmPasswordForUpdate = '';
  }

  updatePassword(): void {
    if (this.newPasswordForUpdate !== this.confirmPasswordForUpdate) {
      alert('Şifreler eşleşmiyor.');
      return;
    }

    const updatePasswordData = {
      userId: this.updatingUser.id,
      newPassword: this.newPasswordForUpdate
    };

    this.userService.updatePassword(updatePasswordData).subscribe(() => {
      alert('Şifre güncellendi.');
      this.updatingUser = null;
      this.newPasswordForUpdate = '';
      this.confirmPasswordForUpdate = '';
      this.loadUsers();
    });
  }
}
