import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;

  private apiUrl = 'http://localhost:5000/api/admin/login';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async handleLogin(): Promise<void> {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both User ID and Password';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const response = await firstValueFrom(
        this.http.post<any>(this.apiUrl, {
          username: this.username,
          password: this.password
        })
      );

      if (response && response.success) {
        sessionStorage.setItem('admin_logged_in', 'true');
        sessionStorage.setItem('admin_username', response.username || this.username);
        if (response.token) {
          sessionStorage.setItem('admin_token', response.token);
        }
        this.router.navigate(['/admin']);
        return;
      } else {
        this.errorMessage = response?.message || 'Invalid User ID or Password.';
      }
    } catch (err: any) {
      if (err.error && err.error.message) {
        this.errorMessage = err.error.message;
      } else if (err.status === 401 || err.status === 400) {
        this.errorMessage = 'Invalid User ID or Password.';
      } else {
        // Fallback for offline mode if DB/Backend API is unreachable
        const storedUser = localStorage.getItem('admin_user_id') || 'admin';
        const storedPass = localStorage.getItem('admin_password') || 'admin123';

        const isValidUser = (this.username === 'admin' || this.username === storedUser);
        const isValidPass = (this.password === 'admin123' || this.password === 'password123' || this.password === storedPass);

        if (isValidUser && isValidPass) {
          sessionStorage.setItem('admin_logged_in', 'true');
          sessionStorage.setItem('admin_username', this.username);
          this.router.navigate(['/admin']);
          return;
        } else {
          this.errorMessage = 'Invalid User ID or Password.';
        }
      }
    } finally {
      this.loading = false;
    }
  }
}
