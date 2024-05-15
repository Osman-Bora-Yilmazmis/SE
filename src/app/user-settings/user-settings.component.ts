import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  selected = 'erkek';
  imageUrl: string = "assets/personicon.png";
  userId : any
  genderList = ['Erkek', 'Kadın'];
  hidePassword: boolean = true;


  profileForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email : new FormControl('', [ Validators.required,Validators.email]),
    phone: new FormControl(0),
    gender: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl('',[Validators.required,Validators.minLength(8)] ),
    id: new FormControl(4)
  });
  

  constructor(private formbuilder: FormBuilder, private userService: UserService ,private snackbar:MatSnackBar) {
    
  }

  ngOnInit(): void {
    debugger
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      var userData = JSON.parse(storedUserData);
    }
    this.userService.getUserById(userData.id).subscribe(
      (user: any) => {
        // Kullanıcı bilgilerini form üzerine bind et
        this.profileForm.patchValue(user);
      },
      
    );
  }
  UpdateUser(e:any){
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      var userData = JSON.parse(storedUserData);
    }
    this.userService.updateUserById(userData.id, {...e,role:userData.role}).subscribe(
      (response: any) => {
        this.profileForm.patchValue(response);
        this.snackbar.open('Profiliniz Güncellenmiştir','Ok',{duration:3000});
      },
      
    );
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

 

  

  
  

}
