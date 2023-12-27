import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService{

  public event:any;

  constructor(private base:BaseService) {
    super(base.http);
  }

  public getEvents() {
    return this.getReq('/events');
  }
  public getEventById(eventId: string) {
    return this.getReq(`/events/${eventId}`);
  }
  public updateEventById(eventId: string, updatedEventObj: any) {
    // Kullanıcı bilgilerini güncelle ve PUT isteği gönder
    return this.putReq(`/events/${eventId}`,updatedEventObj);
  }
  public createEvent(eventObj:any)
   {
     return this.postReq('/events',eventObj)
   }
   public deleteEventById(eventId: string) {
    return this.deleteReq(`/events/${eventId}`);
  }
   
}
