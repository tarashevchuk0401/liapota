import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../shared/MenuItem';
import { Observable, map, tap } from 'rxjs';
import { Discount } from '../shared/Discount';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  path:string = 'https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/menu.json'

  constructor(private httpClient: HttpClient) { }

  addItem(menuItem: MenuItem): Observable<unknown>{
  return  this.httpClient.post(this.path, menuItem )
  }

  getItem(): Observable<any>{
    return this.httpClient.get(this.path).pipe(tap(d => console.log(d)))
  }

  

  deleteItem(id: string){
    return this.httpClient.delete('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/menu/' + id + '.json')
  }

  /// add url of image

  addUrlOfImage(id: string, urlOfImage: string){
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/menu/' + id + '.json', {urlOfImage : urlOfImage })
  }

  changeWeekNumber(numberOfWeek: string){
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/currentNumberOfWeek.json', {numberOfWeek : numberOfWeek })
  }

  getCurrentNumberOfWeek(){
    return this.httpClient.get('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/currentNumberOfWeek.json')
  }

  //// adminstration (discounts)

  getAllDiscounts() : Observable<any>{
    return this.httpClient.get('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/discount.json')
  }

  getTextDiscount(){
    return this.httpClient.get('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/discount.json')
  }

  changeTextDiscount(newDiscount: Discount, id: string){
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/discount/' + id + '.json', newDiscount)
  }

  addUrlOfImageDiscount(id: string, urlOfImage: string){
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/discount/' + id + '.json', {urlOfImage : urlOfImage })
  }


}
