import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { SearchComponent } from './pages/search/search.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { ListCategoriesComponent } from './pages/list-categories/list-categories.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { EditCategorieComponent } from './pages/edit-categorie/edit-categorie.component';
import { EditUsersComponent } from './pages/edit-users/edit-users.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'products/:id',component:ProductDetailComponent},
  {path:'contact',component:ContactComponent},
  {path:'cart',component:CartComponent},
  {path:'search',component:SearchComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'administration',component:AdministrationComponent},
  {path:'administration/listProducts', component: ListProductsComponent},
  {path:'administration/listProducts/addProduct',component:EditProductComponent},
  {path:'administration/listProducts/updateProduct/:id',component:EditProductComponent},
  {path:'administration/listCategories', component: ListCategoriesComponent},
  {path:'administration/listCategories/addCategorie',component:EditCategorieComponent},
  {path:'administration/listCategories/updateCategorie/:id',component:EditCategorieComponent},
  {path:'administration/listUsers', component: ListUsersComponent},
  {path:'administration/listUsers/addUser', component:EditUsersComponent},
  {path:'administration/listUsers/updateUser/:id', component: EditUsersComponent},
  {path:'**',redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
