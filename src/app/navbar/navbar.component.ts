import { Component,OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { LoginRequest } from 'src/core/models/request/login-request.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] | undefined;
  currentUser: User | null = null;
  isLoggedIn: boolean = false;
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router, private readonly apiService: ApiService, private messageService: MessageService) { }
  ngOnInit() {
    
      this.authService.currentUser.subscribe((user: User | null) => {
        this.user = user;
      });
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = user !== null;
    });

    this.items = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            routerLink: '/profile'
          },
          {
            label: 'Sign-Out',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logOut();
            }
          }
        ]
      }
    ];
  }

  async logOut() {
    sessionStorage.clear();
    await this.router.navigate(['/home']);
    location.reload();


  }

}

