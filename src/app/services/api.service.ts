import { Injectable,inject } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { IProducto } from '../models/product.model';
import { Category } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http=inject(HttpClient);
  //private urlBase:string='https://fakestoreapi.com/products/';
  private urlBase:string='http://localhost:3000/products';
  private urlCatBase:string='http://localhost:3000/category';
  
  constructor() { }

  getProducts():Observable<IProducto[]>{
    return this._http.get<IProducto[]>(this.urlBase);
  }

  getProduct(id:number):Observable<IProducto>{
    return this._http.get<IProducto>(`${this.urlBase}/${id}`);
  }

  getProductsPorCateg(category:string):Observable<IProducto[]>{
    return this._http.get<IProducto[]>(`${this.urlBase}category/${category}`);
  }
  deleteProduct(index:number):Observable<IProducto>{
   return this._http.delete<IProducto>(`${this.urlBase}/${index}`);
  }
  addProduct(product:IProducto):Observable<IProducto>{
    return this._http.post<IProducto>(`${this.urlBase}`,product);
   }
  updateProduct(product:IProducto,id:number):Observable<IProducto>{
    return this._http.put<IProducto>(`${this.urlBase}/${id}`,product);
   }

   //****Categories method****/
  getCategories():Observable<Category[]>{
    return this._http.get<Category[]>(this.urlCatBase);
  }
  getCategoryById(id:number):Observable<Category>{
    return this._http.get<Category>(`${this.urlCatBase}/${id}`);
  }
  deleteCategory(index:number):Observable<Category>{
    return this._http.delete<Category>(`${this.urlCatBase}/${index}`);
  }
  addCategory(category:Category):Observable<Category>{
    return this._http.post<IProducto>(`${this.urlCatBase}`,category);
   }
  updateCategory(category:Category,id:number):Observable<Category>{
    return this._http.put<IProducto>(`${this.urlCatBase}/${id}`,category);
   }
}
