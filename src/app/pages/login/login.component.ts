import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  error?: string;
  loginForm:FormGroup;
  menuOption:string='';

  constructor(private fb: FormBuilder,private auth: AuthService, private router: Router) 
  {
    this.loginForm=this.fb.group({
      username : ['',Validators.required],
      password :['',Validators.required],
   
    });
   
   }

  ngOnInit(): void {
  }
 
  login() {
    this.auth.login(this.username, this.password).subscribe((data:string)=>{
      let token=JSON.stringify(data);
      token=token.substring(10,token.length);
      token=token.replace('"}',"");
      localStorage.setItem('access_token', token); 
      console.log(localStorage.getItem('access_token'));      
    })
    if(localStorage.getItem('access_token')!=""){
      this.router.navigate(["/"]);
    }
    else{
      this.error = 'Could not authenticate';
    }
  }
  onOption(menuoption:string){
    this.menuOption=menuoption;
  }

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
}
