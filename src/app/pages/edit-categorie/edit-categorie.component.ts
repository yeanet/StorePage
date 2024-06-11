import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {

  categoryForm:FormGroup;
  title:string="Add Category";
  id?:string |null;
  private _route=inject(ActivatedRoute);
  private _apiservice=inject(ApiService);

  constructor(private fb: FormBuilder,private router: Router) {
    this.categoryForm=this.fb.group({
      category :['',Validators.required]
      
    });
   }

  ngOnInit(): void {
    this.id=this._route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.esEditable();
  }

  esEditable(){
    if(this.id!==null){
      const categoryId:number=parseInt(this.id!);
      this._apiservice.getCategoryById(categoryId).subscribe((data:Category)=>{
        this.title="UPDATE CATEGORY";
         this.categoryForm.setValue({
           category:data.category,
        });
      });
    }
    else{
      this.title="Add Category";
    }
  }

  updateCategory(){
    let categoryId;
    let operacion='';
    if(this.id!==null){
      categoryId=parseInt(this.id!);
      operacion='update';
    }
    else{
      categoryId=0;
      operacion='add';
    }
     
     let category:Category={
     id:categoryId,
     category:this.categoryForm.get('category')?.value,
     }
 
  if(operacion==='update'){
    console.log(operacion);
    
    this._apiservice.updateCategory(category,categoryId).subscribe((data:Category)=>{
      console.log(data);
      this.router.navigate(['administration/listCategories']);
    })
  }
  else if(operacion==='add'){
    this._apiservice.addCategory(category).subscribe((data:Category)=>{
      console.log(data);
      this.router.navigate(['administration/listCategories']);
    });
  }
 }
}


