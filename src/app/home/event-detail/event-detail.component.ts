import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Events {
  id: string,
  name: string,
  detail: string,
  eventCreator: string,
  price: number,
  location: string,
  date: string,
}

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  eventId:string | null | undefined; //backend'den gelen veri null veya undefined olabilir diye böyle atadık
  isNewEvent = false;
  header = "";
  imageUrl: string = "assets/personicon.png";
  
  event: Events = { //placeholder oluşturmak için oluşturduk
    id: "",
    name: "",
    detail: "",
    eventCreator: "",
    price: 0,
    location: "",
    date: "",
  }
  eventForm = new FormGroup({
    name: new FormControl(''),
    detail: new FormControl(''),
    eventCreator: new FormControl(''),
    price: new FormControl(0),
    location: new FormControl(''),
    date: new FormControl(''),
  });

  
  constructor(private eventService: EventService, private router: Router, private readonly route:ActivatedRoute,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    //paramMap router'daki url'nin cevaptaki içerisinde id bulunan sahadaki değeri alır studentId değişkenine atar
    this.route.paramMap.subscribe(
      (params) => {
        debugger;
        this.eventId = params.get("id") //router üzerindeki id yi aldık
        if(this.eventId === "add")
        {
          this.isNewEvent = true;
          this.header = "Event Ekle"
        }
        else
        {
          this.isNewEvent = false;
          this.header = "Event Ekranı"
          this.eventService.getEventById(this.eventId!).subscribe(
            (success) => {
              this.event = success;
              this.eventForm.patchValue(this.event);
            }
          )
        }
      }
    )
  }
  UpdateEvent(e:any){
    this.eventService.updateEventById(this.eventId!,e).subscribe(
      (response: any) => {
        this.eventForm.patchValue(response);
        this.snackbar.open('Eventiniz Güncellenmiştir','Ok');
      },
      
    );
  }

}

