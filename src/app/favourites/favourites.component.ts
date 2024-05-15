import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  user : any
  favoriteData : any

  constructor(public userService:UserService,private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.favoriteData = this.user.favoriteRestaurants
  }

  // Butona tıklandığında çalışacak fonksiyon
  restoranDetail(restoran: any) {
    this.router.navigate(['/restoran', restoran.id]);
  }

}
