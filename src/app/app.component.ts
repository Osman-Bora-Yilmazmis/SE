import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stackoverflow';

  ngOnInit(): void {
    // 'user' adlı öğeyi localStorage'dan silme
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      console.log('localStorage\'daki "user" öğesi başarıyla silindi.');
    } else {
      console.log('localStorage\'da "user" adlı bir öğe bulunamadı.');
    }
  }
}
