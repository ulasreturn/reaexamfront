import { Pipe, PipeTransform } from '@angular/core';
import { House } from 'src/core/models/house.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchHouseName: string): any[] {
    if (!searchHouseName || searchHouseName === '') {
      return value;
    }

    const filteredValue = value.filter((item) =>
      item.house.id .toLowerCase().includes(searchHouseName.toLowerCase()) ||
      item.house.houseName.toLowerCase().includes(searchHouseName.toLowerCase())
    );
    
    return filteredValue;
  }
}

//hangi dosyada kullanıyoruz filter'ı açar mısın?