import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})

export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'eventCreator', 'price', 'location' ,'date',"edit"];
  dataSource = new MatTableDataSource<Events>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  filterString = ''
  currentAuthorization = '';


  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor( private eventService: EventService ,private userService: UserService ) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (res: Events[]) => {
        this.dataSource.data = res;
      }
    );
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


export interface Events {
  id: string,
  name: string,
  detail: string,
  eventCreator: string,
  price: number,
  location: string,
  date: string,
}


