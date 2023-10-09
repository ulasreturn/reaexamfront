import { Pipe, PipeTransform } from '@angular/core';
import { User, UserType } from "../../../../core/models/user.model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchName: string): any[] {
    if (!searchName || searchName === '') {
      return value;
    }

    const filteredValue = value.filter((item) =>
      item.user.fullName .toLowerCase().includes(searchName.toLowerCase()) ||
      item.user.userName.toLowerCase().includes(searchName.toLowerCase())
    );
    
    return filteredValue;
  }
}

//hangi dosyada kullanıyoruz filter'ı açar mısın?