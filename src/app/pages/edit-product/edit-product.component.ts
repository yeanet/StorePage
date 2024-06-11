import { Component, OnInit, inject } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProducto } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  prodCategory:string []=["electronics", "jewelery", "men's clothing", "women's clothing"];
  productForm:FormGroup;
  private _apiservice=inject(ApiService);
  private _route=inject(ActivatedRoute);
  title:string="";
  id?:string |null;

  constructor(private fb: FormBuilder,private router: Router) { 
    this.productForm=this.fb.group({
      product : ['',Validators.required],
      category :['',Validators.required],
      price : ['',Validators.required],
      description : ['',Validators.required],
      image : ['',Validators.required],
      rating : ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.id=this._route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.esEditable();
  }
 
  esEditable(){
    if(this.id!==null){
      const productId:number=parseInt(this.id!);
      this._apiservice.getProduct(productId).subscribe((data:IProducto)=>{
        this.title="UPDATE Product";
         this.productForm.setValue({
         product:data.title,
         category:data.category,
         price:data.price,
         description:data.description,
         image:data.image,
         rating:data.rating
        });
      });
    }
    else{
      this.title="Add Product";
    }
  }

  updateProduct(){
    let productId;
    let operacion='';
    if(this.id!==null){
      productId=parseInt(this.id!);
      operacion='update';
    }
    else{
      productId=0;
      operacion='add';
    }
     
     let product:IProducto={
     id:productId,
     title:this.productForm.get('product')?.value,
     category:this.productForm.get('category')?.value,
     price:this.productForm.get('price')?.value,
     description:this.productForm.get('description')?.value,
     image:this.productForm.get('image')?.value,
     rating:this.productForm.get('rating')?.value,
     }
 
  if(operacion==='update'){
    console.log(operacion);
    
    this._apiservice.updateProduct(product,productId).subscribe((data:IProducto)=>{
      console.log(data);
      this.router.navigate(['administration/listProducts']);
    })
  }
  else if(operacion==='add'){
    this._apiservice.addProduct(product).subscribe((data:IProducto)=>{
      this.router.navigate(['administration/listProducts']);
    });
  }
  }
}
