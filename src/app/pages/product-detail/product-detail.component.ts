import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducto } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ItemCart } from 'src/app/models/itemCart.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  loading:boolean=true;
  private _route=inject(ActivatedRoute);
  private _apiservice=inject(ApiService);
  private _cartService=inject(CartService);
  public product!:IProducto;
  public productsPorCateg:IProducto[]=[];
  public products?:IProducto[]=[];
  public category:string='';
  private _router=inject(Router);
  public rate:number []=[];
  mapRate=new Map<IProducto,number[]>();
  myListCart: ItemCart[]=[];
  itemCart!: ItemCart;
  public page?:number;

  constructor(private toastrService:ToastrService) { }

  ngOnInit(): void {

    this._route.params.subscribe(params=>{
      this._apiservice.getProduct(params['id']).subscribe((data:IProducto)=>{
      this.product=data;
      this.loading=false;
      this.category=this.product.category;
     // this._apiservice.getProductsPorCateg(this.category).subscribe((data)=>{
      //  this.productsPorCateg=data;
     // })
      this._apiservice.getProducts().subscribe((data)=>{
        this.products=data;
        for(let i=0;i<this.products.length;i++){
          if(this.products[i].category===this.product.category){
            this.productsPorCateg.push(this.products[i])
          }
        }
      })
      });
    }); 
  }

  agregarCarrito(product: IProducto){
    console.log(product);
    let itemCart:ItemCart={
    id:0, 
    productId:product.id,
    userId:1,
    cantidad:1,
    }
    console.log(itemCart);
   
      this._cartService.getProductsCart().subscribe((data)=>{
        this.myListCart=data;
      console.log(this.myListCart);

     let index=-1;
     for(let i=0; i<this.myListCart.length;i++){
      if(itemCart.productId===this.myListCart[i].productId)
      {
        index=i;
        break;
      }
      console.log(index);
    }
    console.log(index);
    if(index===-1){
      this._cartService.addToCart(itemCart).subscribe((data:ItemCart)=>{
        console.log(data);
        this.toastrService.info('Success','Your product has been added to the cart!');
       });
    }
    else{
      this.itemCart=this.myListCart[index];
      this.itemCart.cantidad++;
     
      console.log(this.itemCart);
      this._cartService.updateItemCart(this.itemCart.id,this.itemCart).subscribe((data:ItemCart)=>{
        console.log(data);
        this.toastrService.info('Success','Your product has been added to the cart!');
       });
    } 
    });
  }
  navegate(index:number):void{
    this._router.navigate(['/products',index]);
  }
  getStars=(product:IProducto):number[]=>{
   return Array(Math.floor(product.rating)).fill(0); 
  } 
}
