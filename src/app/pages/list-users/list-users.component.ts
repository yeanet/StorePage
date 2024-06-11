import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  private _userService=inject(UserService);
  userList:User[]=[];
  mensaje:string="";
  sortedList:User[]=[];

  constructor(private toastrService:ToastrService) { }

  token?: string | null;

  ngOnInit(): void {
    this.token = localStorage.getItem('access_token');
    this.showUsers();
  }
  showUsers(){
    console.log(this.token);
    this._userService.getUsers().subscribe((data:User[])=>{
      this.userList=data;
     // this.sortedList=this.categoryList.sort(this.orden);
      });
  }

  orden(item1:User,item2:User) {
    //return item1.id - item2.id;
  }

  eliminarUser(index:number){
   try{
      console.log(index);
    this._userService.deleteUser(index).subscribe((data:User)=>{
      this.mensaje="The user was deleted succesfully";
      this.toastrService.info('Info',this.mensaje);
    });
    }
    catch(error){
      this.mensaje="Ocurrio un error" + (error as Error).message;
      this.toastrService.info('Info',this.mensaje);    
    }  
    this.showUsers();
  }

}
