import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  username: string = '';
  password: string = '';
  successMessage: string = ''; // Yeni başarı mesajı değişkeni
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // Burada kullanıcı adı ve şifre doğrulaması yapın.
    if (this.username === 'admin' && this.password === 'adminpassword') {
      // Giriş başarılı, başarı mesajını gösterin.
      this.successMessage = 'Giriş başarılı!'; // Başarı mesajı
      // İsteğe bağlı olarak bir süre sonra mesajı temizleyebilirsiniz.
      setTimeout(() => {
        this.successMessage = '';
      }, 3000); // Mesajı 3 saniye sonra temizle
      // Giriş başarılı ise yönlendirme yapabilirsiniz.
      this.router.navigate(['/admin-panel']); // Admin paneline yönlendirin.
    } else {
      // Giriş başarısız.
      this.errorMessage = 'Kullanıcı adı veya şifre yanlış.';
    }
  }
}
