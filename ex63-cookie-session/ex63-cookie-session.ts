import { Component } from '@angular/core';

@Component({
  selector: 'app-ex63-cookie-session',
  standalone: false,
  templateUrl: './ex63-cookie-session.html',
  styleUrl: './ex63-cookie-session.css',
})
export class Ex63CookieSession {
  cookieOutput = '';
  sessionOutput = '';

  setCookieDemo(): void {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 30);
    document.cookie = `demoUser=SV007; expires=${expires.toUTCString()}; path=/`;
    this.cookieOutput = 'Cookie demoUser đã được tạo (hết hạn sau 30 phút).';
  }

  readCookieDemo(): void {
    const found = document.cookie
      .split(';')
      .map((x) => x.trim())
      .find((x) => x.startsWith('demoUser='));
    this.cookieOutput = found ? `Đọc cookie: ${found}` : 'Không tìm thấy cookie demoUser.';
  }

  clearCookieDemo(): void {
    document.cookie = 'demoUser=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    this.cookieOutput = 'Cookie demoUser đã bị xóa.';
  }

  setSessionDemo(): void {
    sessionStorage.setItem('sessionUser', 'SV007');
    this.sessionOutput = 'Session sessionUser đã được tạo.';
  }

  readSessionDemo(): void {
    const value = sessionStorage.getItem('sessionUser');
    this.sessionOutput = value
      ? `Đọc session: sessionUser=${value}`
      : 'Không tìm thấy sessionUser trong sessionStorage.';
  }

  clearSessionDemo(): void {
    sessionStorage.removeItem('sessionUser');
    this.sessionOutput = 'Session sessionUser đã bị xóa.';
  }
}

