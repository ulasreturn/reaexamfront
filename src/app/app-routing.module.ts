import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './homepage/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { AccountComponent } from './account/account.component';
import { AuthorsComponent } from './authors/authors.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewUserComponent } from './admin/user/new-user/new-user.component';
import { DeleteUserComponent } from './admin/user/delete-user/delete-user.component';
import { EditUserComponent } from './admin/user/edit-user/edit-user.component';
import { NewBookComponent } from './admin/book/new-book/new-book.component';
import { DeleteBookComponent } from './admin/book/delete-book/delete-book.component';
import { EditBookComponent } from './admin/book/edit-book/edit-book.component';
import { CommentsComponent } from './admin/comments/comments.component';
import { ContactsComponent } from './admin/contacts/contacts.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guard/admin.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { SidebarComponent } from './modules/dashboard/sidebar/sidebar.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';
import { ProfileInfoComponent } from './modules/dashboard/profile-info/profile-info.component';
import { SupportComponent } from './modules/dashboard/support/support.component';
import { BookComponent } from './modules/dashboard/book/book.component';




const routes: Routes = [
  { path: '', component: HomeComponent,pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent ,canActivate: [AuthGuard]},
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'products', component: ProductsComponent },
  {path:"account",component:AccountComponent},
  {path:'authors',component:AuthorsComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'footer', component:FooterComponent},
  {path:'navbar', component:NavbarComponent},
  {path:'admin',component:AdminComponent},
  { path: 'admin/new-user', component: NewUserComponent},
  { path: 'admin/edit-user', component: EditUserComponent },
  { path: 'admin/delete-user', component: DeleteUserComponent },
  { path: 'admin/new-book', component: NewBookComponent },
  { path: 'admin/edit-book', component: EditBookComponent },
  { path: 'admin/delete-book', component: DeleteBookComponent },
  { path: 'admin/comments', component: CommentsComponent},
  { path: 'admin/contacts', component: ContactsComponent},
  { path: 'admin/profile', component: AdminProfileComponent},
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  {path:'register',component:RegisterComponent,canActivate:[LoginGuard]},
  { path: 'profile', component: ProfileComponent },
  { path: 'product-details/:bookId', component: ProductDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
