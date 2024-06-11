import { Component, Input, OnInit, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ItemCart } from 'src/app/models/itemCart.model';
import { Subscription } from 'rxjs';
import { IProducto } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  private _cartService=inject(CartService);

  itemsCart:ItemCart[]=[];
  total:number=0;
  cantidad!:number;
  valorUnit:number=0;
  listProductsCart$=this._cartService.listProductsCart$;
  listProducts:IProducto[]=[];
  private _apiService=inject(ApiService);
  loading?:boolean=true;
  subscription!:Subscription;
  mapCart=new Map<IProducto,ItemCart>();

  constructor() { }

  ngOnInit(): void { 
    this.showCart();
  }
  ngOnDestroy() {
  }
  showCart(){
    let product:IProducto;
    this.mapCart=new Map<IProducto,ItemCart>();
    this._cartService.getProductsCart().subscribe((data)=>{
      this.itemsCart=data;
      //console.log(this.itemsCart);
      if(this.itemsCart.length>0){
      this.loading=true;
      let sortedlist:ItemCart[]=[];
      console.log(this.itemsCart.sort(this.orden));
      sortedlist=this.itemsCart.sort(this.orden);
      console.log(sortedlist.length);
      
      for(let i=0;i<sortedlist.length;i++){
        this._apiService.getProduct(sortedlist[i].productId).subscribe((data)=>{
          product=data;
          this.mapCart.set(product,sortedlist[i]);
        }) 
      }
      }
      else 
      this.loading=false;
     })
     console.log(this.mapCart);

  }
  orden(item1:ItemCart,item2:ItemCart) {
    return item1.id - item2.id;
  }
  totalCart():number
  {
   let total=0;
   for(var [key,value] of this.mapCart){
    const precio   = Number(key.price);
    const cantidad= Number(value.cantidad);
    total += (cantidad * precio);
  }
   return total;
  }

  eliminarCarrito(index:number){
    this._cartService.deleteItemCart(index).subscribe((data)=>{
      this.totalCart();
    });
    this.showCart();
  }

  vaciarCarrito(){
    this._cartService.clearCart();
    this.itemsCart=[];
    this.total=0;
    this.loading=false;
  }
 
 updateUnits(operation: string, id: number) {
   let itemCart:ItemCart;
    this._cartService.getCartById(id).subscribe((data)=>{
      itemCart=data;
         
    if (itemCart) {
      if (operation === 'minus' && itemCart.cantidad > 0) {
        itemCart.cantidad = itemCart.cantidad - 1;
        if(itemCart.cantidad===0){
          this.eliminarCarrito(id);
        }
        else{
        this._cartService.updateItemCart(id,itemCart).subscribe((data)=>{
          this.totalCart();        
        });
        }
      }
      else if (operation === 'add') {
        itemCart.cantidad += 1;
        //console.log(itemCart);
       // console.log(id);
       this._cartService.updateItemCart(id,itemCart).subscribe((data)=>{
          //console.log(data);
          this.totalCart();
        });
      }
    }
  })
  this.showCart(); 
  }

}
