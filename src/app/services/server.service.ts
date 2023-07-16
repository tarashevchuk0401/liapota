import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../shared/MenuItem';
import { Observable, map, tap } from 'rxjs';
import { Discount } from '../shared/Discount';
import { About } from '../shared/About';

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
    return this.httpClient.get(this.path).pipe(this.gettingIdKeyFromDB())
  }
  
  ///// Reusable function for pipe 
  gettingIdKeyFromDB(){
  return  map((response : any) => {
      let post = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          post.push({ ...response[key], id: key });
        }
      }
      return post
    })
  }

  deleteItem(id: string) {
    return this.httpClient.delete('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/menu/' + id + '.json')
  }

  /// add url of image in menu

  addUrlOfImage(id: string, urlOfImage: string) {
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/menu/' + id + '.json', { urlOfImage: urlOfImage })
  }

  changeWeekNumber(numberOfWeek: string) {
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/currentNumberOfWeek.json', { numberOfWeek: numberOfWeek })
  }

  getCurrentNumberOfWeek() {
    return this.httpClient.get('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/currentNumberOfWeek.json')
  }

  //// adminstration (discounts)

  addDiscount(discount: Discount): Observable<unknown> {
    return this.httpClient.post('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/discount.json', discount)
  }

  deleteDiscount(id: string) {
    return this.httpClient.delete('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/discount/' + id + '.json')
  }


  getAllDiscounts(): Observable<any> {
    return this.httpClient.get('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/discount.json').pipe(
      this.gettingIdKeyFromDB()
    )
  }

  changeTextDiscount(newDiscount: Discount, id: string) {
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/discount/' + id + '.json', newDiscount)
  }

  addUrlOfImageDiscount(id: string, urlOfImage: string) {
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/discount/' + id + '.json', { urlOfImage: urlOfImage })
  }

  ///// administration (about-us) 

  addAbout(aboutItem: About): Observable<unknown> {
    return this.httpClient.post('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/about-us.json', aboutItem)
  }

  getAllAbout(): Observable<any> {
    return this.httpClient.get('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/about-us.json').pipe(
      this.gettingIdKeyFromDB()
    );
  }

  changeTextAbout(newAbout: About, id: string) {
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/about-us/' + id + '.json', newAbout);
  }

  addUrlOfImageAbout(id: string, urlOfImage: string) {
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/about-us/' + id + '.json', { urlOfImage: urlOfImage })
  }

  deleteAbout(id: string) {
    return this.httpClient.delete('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/about-us/' + id + '.json')
  }

  //// administration (about-us gallery)

  getAllAboutGallery(): Observable<any> {
    return this.httpClient.get('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/gallery.json').pipe(
      this.gettingIdKeyFromDB()
    );
  }

  addUrlOfImageAboutGallery(id: string, urlOfImage: string) {
    return this.httpClient.patch('https://lapotaua-default-rtdb.europe-west1.firebasedatabase.app/administration/gallery/' + id + '.json', { urlOfImage: urlOfImage })
  }


}
