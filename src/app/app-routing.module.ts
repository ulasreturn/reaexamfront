import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './homepage/home.component';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommentsComponent } from './admin/comments/comments.component';
import { ContactsComponent } from './admin/contacts/contacts.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LoginGuard } from './guard/login.guard';
import { UserComponent } from './admin/user/user.component';
import { DetailsComponent } from './details/details.component';
import { TransactionComponent } from './admin/transaction/transaction.component';


const routes: Routes = [
  { path: '', component: HomeComponent,pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path:"account",component:AccountComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'footer', component:FooterComponent},
  {path:'navbar', component:NavbarComponent},
  {path:'admin',component:AdminComponent},
  {path:'admin/user',component:UserComponent},
  {path:'admin/transaction',component:TransactionComponent},
  {path:'admin/comments',component:CommentsComponent},
  { path: 'admin/contacts', component: ContactsComponent},
  { path: 'admin/profile', component: AdminProfileComponent},
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  {path:'register',component:RegisterComponent,canActivate:[LoginGuard]},
  { path: 'profile', component: ProfileComponent },
  { path: 'details/:employeeId', component:DetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
