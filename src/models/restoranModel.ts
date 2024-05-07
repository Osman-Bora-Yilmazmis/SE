import { Yorum } from "./yorumModel";

export interface Restoran {
    isim: string,
    konum: string,
    restoranSahibi: string,
    konsept: string,
    puan: number,
    yorumlar?: Yorum[]
  }