import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';
import { RestoranService } from '../services/restoran.service';
import { Restoran } from 'src/models/restoranModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})

export class HomeComponent {

  displayedColumns: string[] = ['id', 'isim', 'restoranSahibi', 'konsept', 'puan', 'edit'];
  // dataSource = new MatTableDataSource<Events>();
  // dataSource = new MatTableDataSource<Restoran>();
  restoranData: Array<any> = [];
  pageSize = 8;
  page = 13;
  tekrestoran: any

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  filterString = ''
  currentAuthorization = '';



  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  constructor(private eventService: EventService, private userService: UserService, private restoranService: RestoranService, private router: Router) { }

  ngOnInit(): void {
    debugger
    // this.eventService.getEvents().subscribe(
    //   (res: Events[]) => {
    //     this.dataSource.data = res;
    //     console.log(this.dataSource)
    //   }
    // );
    this.restoranService.getRestorans().subscribe(
      (res) => {
        console.dir(res);
        this.restoranData = res
      }
    );
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      var userData = JSON.parse(storedUserData);
    }
    this.userService.getUserById(userData.id).subscribe(
      (user: any) => {
        this.currentAuthorization = user.role
      },

    );
  }

  // filterStudents(){
  //   this.dataSource.filter = this.filterString.trim().toLowerCase();
  // }

  openDialog(_t17: any, arg1: boolean) {
    throw new Error('Method not implemented.');
  }

  // Butona tıklandığında çalışacak fonksiyon
  restoranDetail(restoran: any) {
    this.router.navigate(['/restoran', restoran.id]);
  }
}







