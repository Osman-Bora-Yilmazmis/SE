import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  
  constructor(public userService:UserService, private router:Router) { }

  ngOnInit(): void {
    let str = localStorage.getItem('user');
    console.log(str)
    debugger;
    if(str != null)
    {
        this.userService.user =JSON.parse(str);
    }
    else
    {
      this.router.navigateByUrl('/login');
    }
  }
  

  logout()
  {
    this.userService.user =undefined;
    this.router.navigateByUrl('/login');
  }

}
