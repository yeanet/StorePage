import { Component, KeyValueDiffers, OnInit, inject } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemCart } from '../../models/itemCart.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Landing Page';
  menuOption:string='';
  private _cartService=inject(CartService);
  //loading:boolean=true;
  cantidad:number|undefined;
  searchTerm:string="";
  private _router=inject(Router);
  logueado:boolean=false;
  private _authService=inject(AuthService);
  
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('access_token')!=""){
       this.logueado=true;
    }
    else{
      this.logueado=false;
    }

    this._cartService.getProductsCart().subscribe((data)=>{
     const itemsCart:ItemCart[]=data;
     if(itemsCart.length>0){
     this.cantidad=itemsCart.length;
     }
     else 
     this.cantidad=0;
    });
    }
    onOption(menuoption:string){
      this.menuOption=menuoption;
    }
    onEnter(value:string){
      this.searchTerm = value;
      this.navegate(this.searchTerm);
    }
  
    navegate(searchTerm:string):void{
      this._router.navigate(['/search'], { queryParams: { search: searchTerm } });
    }

    logout(){
      this._authService.logout();
      this.logueado=false;
    }
}
