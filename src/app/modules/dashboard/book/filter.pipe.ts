import { Pipe, PipeTransform } from '@angular/core';
import { Books } from 'src/core/models/books.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchBooksName: string): any[] {
    if (!searchBooksName || searchBooksName === '') {
      return value;
    }

    const filteredValue = value.filter((item) =>
      item.books.id .toLowerCase().includes(searchBooksName.toLowerCase()) ||
      item.books.bookName.toLowerCase().includes(searchBooksName.toLowerCase())
    );
    
    return filteredValue;
  }
}

//hangi dosyada kullanıyoruz filter'ı açar mısın?