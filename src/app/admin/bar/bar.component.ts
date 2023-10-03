import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/admin/home',
      },
      {
        label: 'User',
        icon: 'pi pi-user-edit',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: '/admin/new-user',
          },
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-user-edit',
            routerLink: '/admin/edit-user',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
            routerLink: '/admin/delete-user',
          }
        ]
      },
      {
        label: 'Book',
        icon: 'pi pi-car',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/admin/new-car',
          },
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-user-edit',
            routerLink: '/admin/edit-car',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
            routerLink: '/admin/delete-car',
          },
        ]
      },

      
      {
        label: 'Comments',
        icon: 'pi pi-comments',
        routerLink: '/admin/comments',
      },
      {
        label: 'Contacts',
        icon: 'pi pi-envelope',
        routerLink: '/admin/contacts',
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: '/admin/profile',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        routerLink: '/home',
      }
    ];
  }
}
