import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../shared/MenuItem';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  path: string = 'https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/menu.json'

  constructor(private httpClient: HttpClient) { }

  addItem(menuItem: MenuItem): Observable<unknown> {
    return this.httpClient.post(this.path, menuItem)
  }

  getItem(): Observable<any> {
    return this.httpClient.get(this.path)
  }



  deleteItem(id: string) {
    return this.httpClient.delete('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/menu/' + id + '.json')
  }

  /// add url of image

  addUrlOfImage(id: string, urlOfImage: string) {
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/menu/' + id + '.json', { urlOfImage: urlOfImage })
  }

  changeWeekNumber(numberOfWeek: string) {
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/currentNumberOfWeek.json', { numberOfWeek: numberOfWeek })
  }

  getCurrentNumberOfWeek() {
    return this.httpClient.get('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/currentNumberOfWeek.json')

  }

  ////////////// AUTHENTICATION //////



  setNewUser(email: string, password: string, phone: number, name: string) {
    return this.httpClient.post(
      'https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/users/' +
      sessionStorage.getItem('id') + '.json', { email: email, password: password, id: sessionStorage.getItem('id'), phone: phone, name: name }
    )
  }

  getUser() {
    return this.httpClient.get('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/users/' + sessionStorage.getItem('id') + '.json')
  }

  addToCart(id: string , quantity: number) {
    return this.httpClient.post('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/users/' + sessionStorage.getItem('id') + '/cart' + '.json', {id: id, quantity : quantity})

  }

  getFromCart() {
    return this.httpClient.get('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/users/' + sessionStorage.getItem('id') + '/cart' + '.json')
  }

  removeFromCart(){
    return this.httpClient.delete('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/users/' +  sessionStorage.getItem('id') + '/cart.json')
  }

  removeAllFromCart(){
    return this.httpClient.delete('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/users/' + sessionStorage.getItem('id') +  '/cart.json' )

  }



}
