import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './homepage/home.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AuthorsComponent } from './authors/authors.component';
import { ContactComponent } from './contact/contact.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgFor} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { MessagesModule } from 'primeng/messages';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { BarComponent } from './admin/bar/bar.component';
import { CommentsComponent } from './admin/comments/comments.component';
import { ContactsComponent } from './admin/contacts/contacts.component';
import { MenubarModule } from 'primeng/menubar';
import { DeleteUserComponent } from './admin/user/delete-user/delete-user.component';
import { EditUserComponent } from './admin/user/edit-user/edit-user.component';
import { NewUserComponent } from './admin/user/new-user/new-user.component';
import { DeleteBookComponent } from './admin/book/delete-book/delete-book.component';
import { EditBookComponent } from './admin/book/edit-book/edit-book.component';
import { NewBookComponent } from './admin/book/new-book/new-book.component';
=======
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

>>>>>>> d7088d23fc2fe499d3c50db0311ee1a6b0cf7f34

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    AccountComponent,
    ProductsComponent,
    ProductDetailsComponent,
    AuthorsComponent,
    ContactComponent,
    FavouritesComponent,
    NavbarComponent,
    AboutComponent,
    FooterComponent,
<<<<<<< HEAD
    AdminHomeComponent,
    AdminProfileComponent,
    BarComponent,
    CommentsComponent,
    ContactsComponent,
    DeleteUserComponent,
    EditUserComponent,
    NewUserComponent,
    DeleteBookComponent,
    EditBookComponent,
    NewBookComponent
=======
    AdminComponent,
    LoginComponent
>>>>>>> d7088d23fc2fe499d3c50db0311ee1a6b0cf7f34
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    FormsModule,
    MessagesModule,
    BrowserAnimationsModule,
    NgFor,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
