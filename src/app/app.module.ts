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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgFor} from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { MenuModule } from 'primeng/menu';
import { JwtInterceptor } from 'src/core/services/interceptor/jwt.interceptor';
import { SidebarComponent } from './modules/dashboard/sidebar/sidebar.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ProfileInfoComponent } from './modules/dashboard/profile-info/profile-info.component';
import { DialogModule } from 'primeng/dialog';

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
    NewBookComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    ProfileComponent,
    ProfileInfoComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    FormsModule,
    ButtonModule,
    MessagesModule,
    BrowserAnimationsModule,
    NgFor,
    HttpClientModule,
    CardModule,
    CascadeSelectModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    MenuModule,
    ConfirmDialogModule,
    TableModule,
    ToolbarModule,
    DatePipe,
    ReactiveFormsModule,
    ToastModule,
    DialogModule
  
  
   
  ],
  
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
