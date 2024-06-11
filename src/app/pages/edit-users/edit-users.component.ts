import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  
  userForm:FormGroup;
  title:string="Add User";
  id?:string |null;
  private _route=inject(ActivatedRoute);
  private _userService=inject(UserService);
  

  constructor(private fb: FormBuilder,private router: Router) {
    this.userForm=this.fb.group({
      mail :['',Validators.required],
      password :['',Validators.required],
      reppassword :['',Validators.required]
    });
   }

  ngOnInit(): void {
    this.id=this._route.snapshot.paramMap.get('id');
    this.esEditable();
  }

  esEditable(){
    if(this.id!==null){
      const userId:number=parseInt(this.id!);
      this._userService.getUserById(userId).subscribe((data:User)=>{
        this.title="UPDATE User";
        console.log(data.email);
         this.userForm.setValue({
          mail:data.email,
          password:"",
          reppassword:""
        });
      });
    }
    else{
      this.title="Add User";
    }
  }

  updateUser(){
    let userId;
    let operacion='';
    if(this.id!==null){
      userId=parseInt(this.id!);
      operacion='update';
    }
    else{
      userId=0;
      operacion='add';
    }
     
     let user:User={
     id:userId,
     email:this.userForm.get('mail')?.value,
     password:this.userForm.get('password')?.value
     }
 
  if(operacion==='update'){
 try
 {    
    this._userService.updateUser(user,userId).subscribe((data:User)=>{
      console.log(data);
      this.router.navigate(['administration/listUsers']);
    })
  }
  catch(error:any){
     alert("Hubo un error" + error);
  }
  }
  else if(operacion==='add'){
    this._userService.addUser(user).subscribe((data:User)=>{
      console.log(data);
      this.router.navigate(['administration/listUsers']);
    });
  }
 }

/* Event fired when <i> is clicked */
showPassword(){
  let icon :HTMLElement| null;
  let password:HTMLInputElement| null;

  icon= document.getElementById('togglePassword');
  password = document.getElementById('password') as HTMLInputElement;
  
  if(password?.type === "password") {
    password.type = "text";
    icon?.classList.add("fa-eye-slash");
    icon?.classList.remove("fa-eye");
  }
  else {
    password.type = "password";
    icon?.classList.add("fa-eye");
    icon?.classList.remove("fa-eye-slash");
  }
}
showRepPassword(){
  let icon :HTMLElement| null;
  let reppassword:HTMLInputElement| null;

  icon= document.getElementById('toggleRepPassword');
  reppassword = document.getElementById('reppassword') as HTMLInputElement;
  
  if(reppassword?.type === "password") {
    reppassword.type = "text";
    icon?.classList.add("fa-eye-slash");
    icon?.classList.remove("fa-eye");
  }
  else {
    reppassword.type = "password";
    icon?.classList.add("fa-eye");
    icon?.classList.remove("fa-eye-slash");
  }
}

}