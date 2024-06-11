import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IProducto } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search:string="";
  private _route=inject(ActivatedRoute);
  private _apiservice=inject(ApiService);
  listProduct:IProducto[]=[];
  private _router=inject(Router); 
  opcionOrder:string="";
  private listProducts=new BehaviorSubject<IProducto[]>([]);
  listProducts$=this.listProducts.asObservable();
  products:IProducto[]=[];

  constructor() { }

  ngOnInit(): void {
    this._apiservice.getProducts().subscribe((data:IProducto[])=>{
      this.listProduct=data;
         
    this._route.queryParams.subscribe(params=>{
      this.search=params['search'];
      this.products=[];
     
     for(let i=0;i<this.listProduct.length;i++){
      if(this.listProduct[i].title.toLowerCase().includes(this.search.toLowerCase())===true || this.listProduct[i].category.toLowerCase().includes(this.search.toLowerCase())===true)
      {
        this.products.push(this.listProduct[i]);
      }
    }
    this.listProducts.next(this.products);
    console.log(this.products);
  });
}); 
}
  navegate(index:number):void{
    this._router.navigate(['/products',index]);
  }
  getStars=(product:IProducto):number[]=>{
    return Array(Math.floor(product.rating)).fill(0); 
  } 
  onChange(){
   let listSort:IProducto[]=[];
    if(this.opcionOrder==="1"){
    listSort=this.products.sort(this.minorPrice);
    }
    else{
     listSort=this.products.sort(this.mayorPrice);
    }
    this.listProducts.next(listSort);
  
  }
  minorPrice(prod1:IProducto,prod2:IProducto) {
    return prod1.price - prod2.price;
  }
  mayorPrice(prod1:IProducto,prod2:IProducto) {
    return prod2.price - prod1.price;
  }
}
