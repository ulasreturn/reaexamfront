export interface RandevuRequest{
    userId: number;
    randevuTarihi: Date;
    doktorId?: number;
    hastaId?: number;
    hastaBilgi?:string;

  }