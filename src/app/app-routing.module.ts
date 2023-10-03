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
<<<<<<< HEAD
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

=======
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
>>>>>>> d7088d23fc2fe499d3c50db0311ee1a6b0cf7f34
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'homepage',component: HomeComponent},
  { path: 'cart', component: CartComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'account', component: AccountComponent },
  {path:'authors',component:AuthorsComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'footer', component:FooterComponent},
  {path:'navbar', component:NavbarComponent},
<<<<<<< HEAD
  {path:'admin/home', component:AdminHomeComponent}


=======
  {path:'admin', component:AdminComponent},
  {path:'login',component:LoginComponent}
>>>>>>> d7088d23fc2fe499d3c50db0311ee1a6b0cf7f34
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
