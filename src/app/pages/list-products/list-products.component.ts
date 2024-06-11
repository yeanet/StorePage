import { Component, OnInit, inject } from '@angular/core';
import { IProducto } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  private _apiService=inject(ApiService);
  productList:IProducto[]=[];
  mensaje:string="";
  sortedList:IProducto[]=[];


  constructor(private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.showProducts();
  }
  showProducts(){
    this._apiService.getProducts().subscribe((data:IProducto[])=>{
      this.productList=data;
      this.sortedList=this.productList.sort(this.orden);
      });
  }

  orden(item1:IProducto,item2:IProducto) {
    return item1.id - item2.id;
  }

  eliminarProducto(index:number){
    try{
      console.log(index);
    this._apiService.deleteProduct(index).subscribe((data:IProducto)=>{
      //let pos= this.productList.findIndex((data)=> data.id === index)
      //this.productList.splice(pos,1); 
      this.mensaje="The product was deleted succesfully";
      this.toastrService.info('Info',this.mensaje);
    });
    }
    catch(error){
      this.mensaje="Ocurrio un error" + (error as Error).message;
      this.toastrService.info('Info',this.mensaje);    
    }  
    this.showProducts();
  }
  }

