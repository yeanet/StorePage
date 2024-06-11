import { Component, OnInit, inject } from '@angular/core';
import { IProducto } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  menuOption:string='';

  constructor() { }

  ngOnInit(): void {
    
  }
  onOption(menuoption:string){
    this.menuOption=menuoption;
  }
 
  }

