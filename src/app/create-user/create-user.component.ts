import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private fb:FormBuilder,public userService:UserService,private snackbar:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }


  createUserForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    username:['',[Validators.required,Validators.maxLength(10)]],
    password:['',[Validators.required,Validators.minLength(8)]],
    name:[''],
    surname:[''],
    dateOfBirth:[''],
    Adress:[''],
  })

  get f(): { [key: string]: AbstractControl } {
    return this.createUserForm.controls;
  }

  createAccount()
  {
      this.userService.createAccount(this.createUserForm.value).subscribe((res:any)=>{
        console.log(res);
        this.router.navigateByUrl('/login');
        this.snackbar.open('Kullanıcı Başarıyla Oluşturuldu','Ok');
      })
  }
}
