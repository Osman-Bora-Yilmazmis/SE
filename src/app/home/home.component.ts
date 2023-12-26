import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})

export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['_id', 'name', 'eventCreator', 'price', 'location' ,'date',"edit"];
  dataSource = new MatTableDataSource<Events>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  filterString = ''


  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor( private eventService: EventService  ) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (res: Events[]) => {
        this.dataSource.data = res;
      }
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


