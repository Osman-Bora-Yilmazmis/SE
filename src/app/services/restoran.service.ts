import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RestoranService extends BaseService {


  constructor(private base:BaseService) {
    super(base.http);
  }
  public getRestorans() {
    return this.getReq('/restoranlar');
  }
  public getRestoranById(restoranId: string) {
    return this.getReq(`/restoranlar/${restoranId}`);
  }
  public updateRestoranById(restoranId: string, updatedRestoranObj: any) {
    // Kullanıcı bilgilerini güncelle ve PUT isteği gönder
    return this.putReq(`/restoranlar/${restoranId}`,updatedRestoranObj);
  }
  public createRestoran(restoranObj:any)
   {
     return this.postReq('/restoranlar',restoranObj)
   }
   public deleteRestoranById(restoranId: string) {
    return this.deleteReq(`/restoranlar/${restoranId}`);
  }
}
