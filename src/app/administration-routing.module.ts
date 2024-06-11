import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdministrationComponent } from "./pages/administration/administration.component";
import { ListProductsComponent } from "./pages/list-products/list-products.component";
import { ListCategoriesComponent } from "./pages/list-categories/list-categories.component";
import { ListUsersComponent } from "./pages/list-users/list-users.component";

const adminRoutes: Routes = [
  
    {
      path:'administration',
      component:AdministrationComponent,
      children: [
      {
        path: 'listProducts',
        component: ListProductsComponent
      },
      {
        path:'listCategories', 
      component: ListCategoriesComponent
      },
      {
        path:'listUsers',
         component: ListUsersComponent
      }
    ]  
  },
   /*  {path:'administration/listProducts', component: ListProductsComponent},
    {path:'administration/listProducts/addProduct',component:EditProductComponent},
    {path:'administration/listProducts/updateProduct/:id',component:EditProductComponent},
    {path:'administration/listCategories', component: ListCategoriesComponent},
    {path:'administration/listCategories/addCategorie',component:EditCategorieComponent},
    {path:'administration/listCategories/updateCategorie/:id',component:EditCategorieComponent},
    {path:'administration/listUsers', component: ListUsersComponent},
    {path:'administration/listUsers/addUser', component:EditUsersComponent},
    {path:'administration/listUsers/updateUser/:id', component: EditUsersComponent},*/
    {path:'**',redirectTo:'', pathMatch:'full'} 
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(adminRoutes)],
    //imports: [RouterModule.forChild(layoutRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }