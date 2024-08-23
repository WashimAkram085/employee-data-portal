import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(datalist: any[], search: string): any {
    if (!datalist) {
      return [];
    }
    else if (!search) {
      return datalist;
    } else {
      search = search.toLowerCase();
      return datalist.filter((data) => {
        if (data.name.toLowerCase().includes(search) || data.department.toLowerCase().includes(search) || data.role.toLowerCase().includes(search) || data.email.toLowerCase().includes(search) || data.mobile.toLowerCase().includes(search) || data.dob.toLowerCase().includes(search)) {
          return data;
        };
      });
    }
  }
}
