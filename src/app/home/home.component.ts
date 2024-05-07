import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';
import { RestoranService } from '../services/restoran.service';
import { Restoran } from 'src/models/restoranModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})

export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'isim', 'restoranSahibi', 'konsept', 'puan', 'edit'];
  // dataSource = new MatTableDataSource<Events>();
  dataSource = new MatTableDataSource<Restoran>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  filterString = ''
  currentAuthorization = '';


  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor( private eventService: EventService ,private userService: UserService, private restoranService : RestoranService ) { }

  ngOnInit(): void {
    debugger
    // this.eventService.getEvents().subscribe(
    //   (res: Events[]) => {
    //     this.dataSource.data = res;
    //     console.log(this.dataSource)
    //   }
    // );
    this.restoranService.getRestorans().subscribe(
      (res:Restoran[]) =>{
        this.dataSource.data = res
        console.log(JSON.stringify(this.dataSource.data) + "bbbbbb")
      }
    )
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      var userData = JSON.parse(storedUserData);
    }
    this.userService.getUserById(userData.id).subscribe(
      (user: any) => {
        this.currentAuthorization = user.authorization_level
      },
      
    );
  }

  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
  


}







