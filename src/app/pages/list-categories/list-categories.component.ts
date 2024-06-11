import { Component, OnInit, inject } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  private _apiService=inject(ApiService);
  categoryList:Category[]=[];
  mensaje:string="";
  sortedList:Category[]=[];
  
  constructor(private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.showCategories();
  }
  showCategories(){
    this._apiService.getCategories().subscribe((data:Category[])=>{
      this.categoryList=data;
     // this.sortedList=this.categoryList.sort(this.orden);
      });
  }

  orden(item1:Category,item2:Category) {
    //return item1.id - item2.id;
  }

  eliminarCategory(index:number){
   try{
      console.log(index);
    this._apiService.deleteCategory(index).subscribe((data:Category)=>{
      this.mensaje="The category was deleted succesfully";
      this.toastrService.info('Info',this.mensaje);
    });
    }
    catch(error){
      this.mensaje="Ocurrio un error" + (error as Error).message;
      this.toastrService.info('Info',this.mensaje);    
    }  
    this.showCategories();
  }

}
