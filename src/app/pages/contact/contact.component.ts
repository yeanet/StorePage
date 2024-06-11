import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.contactForm=this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      message:['', [Validators.required,Validators.minLength(10)]]
    });
   }

  ngOnInit(): void {
  }
  enviar(event:Event){
    event.preventDefault();
    console.log(this.contactForm.value);
  }
  hasErrors(field:string,typeError:string){
    return this.contactForm.get(field)?.hasError(typeError)&& this.contactForm.get(field)?.touched;
  }

}
