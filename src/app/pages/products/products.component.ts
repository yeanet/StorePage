import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IProducto } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private _apiService=inject(ApiService);
  productList:IProducto[]=[];
  public page?:number;
  private _router=inject(Router);
  loading:boolean=true;
  product?:IProducto;
  //list:any [] []=[];
  //public rate:number []=[];
  mapRate=new Map<IProducto,number[]>();
  
  constructor() { }

  ngOnInit(): void {

    this._apiService.getProducts().subscribe((data:IProducto[])=>{
      this.loading=false;
      this.productList=data;
      //console.log(this.productList.length);
      /* for(let i=0;i<this.productList.length;i++){
        //this.mapRate.set(this.productList[i],this.getStars(this.productList[i]));
        //this.rate=this.getStars(this.productList[i]);
        console.log("aaaaa"+ i);
      } */
    });
}

  navegate(index:number):void{
    this._router.navigate(['/products',index]);
  }
 
  getStars=(product:IProducto):number[]=>{
    return Array(Math.floor(product.rating)).fill(0); 
  } 

  }



