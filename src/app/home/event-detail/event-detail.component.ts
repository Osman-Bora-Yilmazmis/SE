import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { RestoranService } from 'src/app/services/restoran.service';
import { Restoran } from 'src/models/restoranModel';
import { Events } from 'src/models/eventModel';




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
  currentAuthorization = "";
  event_Creator = "";
  user : any = {};


  event: Events = { //placeholder oluşturmak için oluşturduk
    id: 0,
    name: "",
    detail: "",
    eventCreator: "",
    price: 0,
    location: "",
    date: "",
  }
  restoran : Restoran = {
    isim: "",
    konum: "",
    restoranSahibi: "",
    konsept: "",
    puan: 0,
    restoranImageUrl:"",
    qrMenuUrl:"",
    menuUrl:"",
    yorumlar: []
  }
  eventForm = new FormGroup({
    name: new FormControl('',Validators.required),
    detail: new FormControl('',Validators.required),
    eventCreator: new FormControl('',Validators.required),
    price: new FormControl(0,Validators.required),
    location: new FormControl('',Validators.required),
    date: new FormControl('',[Validators.required]),
  });
  restoranForm = new FormGroup({
    isim: new FormControl('',Validators.required),
    konum: new FormControl('',Validators.required),
    restoranSahibi: new FormControl('',Validators.required),
    konsept: new FormControl('',Validators.required),
    puan: new FormControl('',Validators.required),
  })

  
  constructor(private eventService: EventService,private userService: UserService, private router: Router, private readonly route:ActivatedRoute,private snackbar:MatSnackBar, private restoranService: RestoranService) {

   }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') ?? '{}');
    console.log("aaaa" + this.user)


    //paramMap router'daki url'nin cevaptaki içerisinde id bulunan sahadaki değeri alır studentId değişkenine atar
    this.route.paramMap.subscribe(
      (params) => {
        debugger;
        this.eventId = params.get("id") //router üzerindeki id yi aldık

        if(this.eventId === "add")
        {
          this.isNewEvent = true;
          this.header = "Restoran Ekle"
        }
        else
        {
          this.isNewEvent = false;
          this.header = "Restoran Detayı"
          debugger
          this.restoranService.getRestoranById(this.eventId!).subscribe(
            (success) => {
              this.restoran = success;
              this.restoranForm.patchValue(this.restoran);
              console.log(this.restoran)

              // this.restoranForm.get('eventCreator')!.setValue(success.eventCreator);
            }
          )

        }
      }
    )
    // const storeduser = localStorage.getItem('user');
    // if (storeduser) {
    //   var user = JSON.parse(storeduser);
    // }
    // this.userService.getUserById(user.id).subscribe(
    //   (user: any) => {
    //     this.currentAuthorization = user.authorization_level
    //     this.restoranForm.get('restoranSahibi')!.setValue(user.name + " " + user.surname);
    //   },
      
    // );
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

  FavoriyeEkle(){
    console.log("sa")
  }

  MenuButton() {
    window.open(this.restoran.menuUrl, "_blank");
  }
  


}

