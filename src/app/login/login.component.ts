import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,public userService:UserService,private snackbar:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }


  login()
  {
      this.userService.getUser(this.loginForm.value.email).subscribe((res:any)=>{
      console.log(res);

       if(res.length == 0)
       {
        this.snackbar.open('Böyle bir hesap bulunmadı','Ok');
       }
       else{
         if(res[0].password === this.loginForm.value.password)
         {
           this.userService.user= res[0];
           localStorage.setItem('user',JSON.stringify(res[0]));
           this.router.navigateByUrl('/home');
         }
         else{
           this.snackbar.open('Yanlış Şifre','Ok');
         }
       }
      })
  }



}
