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
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
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
import { AdminGuard } from './admin.guard';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'products', component: ProductsComponent },
  {path:"account",component:AccountComponent},
  {path:'authors',component:AuthorsComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'footer', component:FooterComponent},
  {path:'navbar', component:NavbarComponent},
  {path:'admin',component:AdminComponent},
   {path:'admin/home', component:AdminHomeComponent},
  { path: 'admin/new-user', component: NewUserComponent},
  { path: 'admin/edit-user', component: EditUserComponent },
  { path: 'admin/delete-user', component: DeleteUserComponent },
  { path: 'admin/new-book', component: NewBookComponent },
  { path: 'admin/edit-book', component: EditBookComponent },
  { path: 'admin/delete-book', component: DeleteBookComponent },
  { path: 'admin/comments', component: CommentsComponent},
  { path: 'admin/contacts', component: ContactsComponent},
  { path: 'admin/profile', component: AdminProfileComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
