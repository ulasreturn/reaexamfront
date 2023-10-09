import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { AddCardRequest } from 'src/core/models/request/addCard-request.model';
import { Card } from 'src/core/models/card.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public addCardRequest: AddCardRequest = <AddCardRequest>{};
  constructor(private apiService :ApiService) {}

  cards: Card[] = [];

  onCreate(entity: AddCardRequest) {
    this.createEntity<AddCardRequest>(entity, 'Cards').then(response => {
      if (response?.status == ResponseStatus.Ok) {
       console.log(response.message);
      }
    });
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }

  ngOnInit(): void {
    


}
}
