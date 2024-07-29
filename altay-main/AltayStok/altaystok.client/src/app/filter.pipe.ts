import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => {
      return item.urunAdi.toLowerCase().includes(searchTerm) ||
        item.urunKodu.toLowerCase().includes(searchTerm) ||
        item.kategori.toLowerCase().includes(searchTerm);
    });
  }
}
