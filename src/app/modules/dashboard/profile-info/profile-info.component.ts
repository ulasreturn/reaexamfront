import { Component,ViewEncapsulation} from '@angular/core';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
 
})
export class ProfileInfoComponent {
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  user: User | null = null; // Değişkeni başlatıcı ile tanımlayın ve null ile başlatın

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Kullanıcı bilgilerini AuthService üzerinden al
    this.authService.currentUser.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  
}

