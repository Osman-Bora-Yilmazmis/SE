import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  selected = 'erkek';
  imageUrl: string = "assets/personicon.png";

  user: any;
  userUpdateForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userUpdateForm = this.fb.group({
      surname: [''],
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      gender:[''],
      mobile : 0,
      username: ['', Validators.required],
      dateOfBirth: [''],
      Adress: ['']
    });
  }

  ngOnInit(): void {
  }

  
  

}
