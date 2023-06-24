import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../shared/MenuItem';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  path:string = 'https://lapota-te-ua-default-rtdb.europe-west1.firebasedatabase.app/menu.json'

  constructor(private httpClient: HttpClient) { }

  addItem(menuItem: MenuItem): Observable<unknown>{
  return  this.httpClient.post(this.path, menuItem )
  }

  getItem(): Observable<any>{
    // return this.httpClient.get(this.path).pipe(
    //   map(item => Object.values(item)),
    //   map(i =>Object.values(i)),
    // )
    return this.httpClient.get(this.path)
  }

  

  deleteItem(id: string){
    return this.httpClient.delete('https://lapota-te-ua-default-rtdb.europe-west1.firebasedatabase.app/menu/' + id + '.json')
  }


}
