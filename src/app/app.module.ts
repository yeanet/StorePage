import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { FooterComponent } from './pages/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartComponent } from './pages/cart/cart.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ToastrModule } from 'ngx-toastr';
import { SearchComponent } from './pages/search/search.component';
import { HeaderComponent } from './pages/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { ListCategoriesComponent } from './pages/list-categories/list-categories.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { EditCategorieComponent } from './pages/edit-categorie/edit-categorie.component';
import { EditUsersComponent } from './pages/edit-users/edit-users.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
    ContactComponent,
    FooterComponent,
    CartComponent,
    AdministrationComponent,
    EditProductComponent,
    SearchComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ListProductsComponent,
    ListCategoriesComponent,
    ListUsersComponent,
    EditCategorieComponent,
    EditUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgClass,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot()
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
