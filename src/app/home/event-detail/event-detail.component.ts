import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

export interface Events {
  id: number,
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
  isBuyButtonVisible: boolean = true;
  isReturnButtonVisible: boolean = false;
  currentAuthorization = "";
  spinner = false

  buyEvent() {
    // Satın al butonuna tıklandığında
    this.spinner = true
    
    setTimeout(() => {
      // 2 saniye sonra çalışacak işlemler
      this.spinner = false;
      this.isBuyButtonVisible = false;
      this.isReturnButtonVisible = true;
      // İlgili satın alma işlemleri burada yapılabilir
      this.snackbar.open('Event başarıyla satın alınmıştır', 'Ok');
    }, 2000); // 2000 milisaniye (2 saniye) beklenir
    
  }

  returnEvent() {
    this.spinner = true
    setTimeout(() => {
      // 2 saniye sonra çalışacak işlemler
      this.spinner = false;
      this.isBuyButtonVisible = true;
      this.isReturnButtonVisible = false;
      this.snackbar.open('Event başarıyla iade edilmiştir', 'Ok');
    }, 2000); // 2000 milisaniye (2 saniye) beklenir
    
    // İlgili iade işlemleri burada yapılabilir
  }
  
  event: Events = { //placeholder oluşturmak için oluşturduk
    id: 0,
    name: "",
    detail: "",
    eventCreator: "",
    price: 0,
    location: "",
    date: "",
  }
  eventForm = new FormGroup({
    name: new FormControl('',Validators.required),
    detail: new FormControl('',Validators.required),
    eventCreator: new FormControl('',Validators.required),
    price: new FormControl(0,Validators.required),
    location: new FormControl('',Validators.required),
    date: new FormControl('',[Validators.required]),
  });

  
  constructor(private eventService: EventService,private userService: UserService, private router: Router, private readonly route:ActivatedRoute,private snackbar:MatSnackBar) { }

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
              this.eventForm.get('eventCreator')!.setValue(success.eventCreator);
            }
          )
        }
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

  UpdateEvent(updatedEvent:any){
    this.eventService.updateEventById(this.eventId!,updatedEvent).subscribe(
      (response: any) => {
        this.eventForm.patchValue(response);
        this.snackbar.open('Eventiniz Güncellenmiştir','Ok',{duration:3000});
      },
      
    );
  }
  CreateEvent(){
    this.eventService.createEvent(this.eventForm.value).subscribe(
      (success) => {
        if (this.eventForm.invalid) {
          this.snackbar.open('Lütfen Tüm Alanları Doldurun','Ok',{duration:3000})
          return;
        }else{
          this.snackbar.open('Event Başarılı Bir Şekilde Eklendi','Ok',{duration:3000})
          this.router.navigateByUrl('home');
        }
        
      },
    )
  }
  DeleteEvent(){
    debugger
    this.eventService.deleteEventById(this.eventId!).subscribe(
      (success) => {
        console.log(success)
        this.snackbar.open('Event başarılı bir şekilde silindi',"Ok",{duration:3000})
        this.router.navigateByUrl('home');
      }
    )
  }



}

