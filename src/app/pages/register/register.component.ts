import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  password!: string;
  email!: string;
  repPassword!: string;
  check!:boolean;
  error?: string;
  registerForm:FormGroup;
  private _router=inject(Router);

  constructor(private fb: FormBuilder,private auth: AuthService, private router: Router)
   { 
    this.registerForm=this.fb.group({
      
      email : ['',Validators.required],
      password :['',Validators.required],
      repPassword :['',Validators.required],
      check:['',Validators.requiredTrue]
   
    });
   }

  ngOnInit(): void {
  }
  register(){
    let token:string;
    this.email=this.registerForm.get('email')?.value;
    this.password=this.registerForm.get('password')?.value;
    this.repPassword=this.registerForm.get('reppassword')?.value;
    if(this.password===this.repPassword){

    this.auth.register(this.email,this.password).subscribe((data:string)=>{
       token=data;
       console.log(token);
    })
  }
  else{
      alert("The password must match")
  }

  }

  navigate(){
    this._router.navigate(['/home']);
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
