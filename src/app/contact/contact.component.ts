import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactRequest } from 'src/core/models/request/contact-request.model';
import { ApiService } from 'src/core/services/api/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService]
})
export class ContactComponent {
  FormData?: FormGroup;

  constructor(private builder: FormBuilder, private apiService: ApiService, private messageService: MessageService,) {}

  public contactRequest: ContactRequest =<ContactRequest>{}


  sendingMail() {
    return this.apiService.sendMail(this.contactRequest)
    .subscribe(
      result => {
        
        console.log('Email sent successfully', result);
        this.messageService.add({ severity: 'success', summary: 'Başarılı!', detail: 'Mesajınız İletildi!' });
      },
      error => {
        
        console.error('Error sending email', error);
        this.messageService.add({ severity: 'error', summary: 'Hata!', detail: 'Mesajınız Gönderilemedi!' });
      }
    );
  }




 /* onSubmit(FormData) {
    console.log(FormData)
    this.contact.PostMessage(FormData)
    .subscribe(response => {
    location.href = 'https://mailthis.to/confirm'
    console.log(response)
    }, error => {
    console.warn(error.responseText)
    console.log({ error })
    })
    }
*/
  ngOnInit() {
  /*  this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Comment: new FormControl('', [Validators.required])
      })
  }*/


}
}
