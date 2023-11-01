import { HttpClient } from '@angular/common/http';
import { Component,ViewEncapsulation } from '@angular/core';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminProfileComponent {
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  user: any; 
   // Değişkeni başlatıcı ile tanımlayın ve null ile başlatın

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Kullanıcı bilgilerini AuthService üzerinden al
    this.authService.currentUser.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  
}