import { Component, Input, KeyValueDiffers, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ItemCart } from './models/itemCart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Landing Page';
   
  constructor(){}

  ngOnInit(): void {
  }

}