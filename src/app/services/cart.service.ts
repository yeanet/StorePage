import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { ItemCart } from 'src/app/models/itemCart.model';
import { IProducto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private localStorageKey ='listaCart';
  private urlBase:string='http://localhost:3000/cart';
  private _http=inject(HttpClient);
  itemCart!: ItemCart;
  myListCart: ItemCart[]=[];
  private listProductsCart=new BehaviorSubject<IProducto[]>([]);
  listProductsCart$=this.listProductsCart.asObservable();
 
  constructor(private http: HttpClient) { }


  getProductsCart():Observable<ItemCart[]>{
    //let listCart=JSON.parse(localStorage.getItem(this.localStorageKey)as string) || [];
    return this._http.get<ItemCart[]>(this.urlBase);
    //this.listProductsCart.next(listCart);
    
   }
   getCartById(id:number):Observable<ItemCart>{
    return this._http.get<ItemCart>(`${this.urlBase}/${id}`);
   }
 
   addToCart(itemCart:ItemCart):Observable<ItemCart>{
     return this._http.post<ItemCart>(`${this.urlBase}`,itemCart);
    }
   
   deleteItemCart(index:number):Observable<ItemCart>{
    return this._http.delete<ItemCart>(`${this.urlBase}/${index}`);
     
    // localStorage.setItem(this.localStorageKey,JSON.stringify(this.myListCart));
     //this.listProductsCart.next(this.myListCart);
   } 

   clearCart(){
    localStorage.clear();
    this.myListCart=[];
   // this.listProductsCart.next(this.myListCart);
   }

    updateItemCart(id:number,itemCart:ItemCart){  
    return this._http.put<ItemCart>(`${this.urlBase}/${id}`,itemCart);
   }
}
