import { Component,OnInit } from '@angular/core';
import { Message } from 'primeng/api';

interface modelType {
  name: string;
}

interface gearType {
  name: string;
}

interface oilType {
  name: string;
}
@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  carName!: string;
  modelName!: string;
  modelYear!: string;
  carImage!: string;
  price!: string;
  maxKm!: string;

  messages: Message[] = [];

  models: modelType[] = [];

  selectedModel: modelType[] = [];

  gears: gearType[] = [];

  selectedGear: gearType[] = [];

  oils: oilType[] = [];

  selectedOil: oilType[] = [];

  ngOnInit() {

    this.messages = [
      { severity: 'warn', summary: 'Uyarı', detail: 'Araç popülerlik ( popularity ) durumu otomatik olarak ( 0 ) dolacaktır.' },
      { severity: 'warn', summary: 'Uyarı', detail: 'Araç müsaitlik durumu ( status ) otomatik olarak ( 0 ) dolacaktır.' },
    ];

    this.models = [
      { name: 'Sedan' },
      { name: 'Hatchback' },
      { name: 'SUV' },
    ];

    this.gears =[
      { name:'Manuel'},
      { name:'Otomatik'},
    ]

    this.oils = [
      { name: 'Benzin' },
      { name: 'Dizel' },
      { name: 'Hibrit' },
      { name: 'Elektrik' },
    ]
  }
}


