import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from '../shared/MenuItem';
import { ServerService } from '../services/server.service';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allMenu: MenuItem[] = [];
  showMenu: MenuItem[] = [];
  checkedPartOfMenu: string = '';
  checkedDay: string = '';
  checkedNumberOfWeek: string = '1';
  all: string = 'all'

  labelPosition : string = '';

  /// Image variables 
  path: string = '';
  name: string = '';
  urlOfImage: string = '';

  constructor(private server: ServerService, private angularFireStoreg : AngularFireStorage) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  submitReset(menu: NgForm) {
    let item: MenuItem = {
      dish1: menu.value.dish1,
      dish2: menu.value.dish2,
      // dish3: menu.value.dish3,
      // dish4: menu.value.dish4,
      // dish5: menu.value.dish5,
      // dish6: menu.value.dish6,
      dayOfWeek: menu.value.dayOfWeek ,
      numberOfWeek : menu.value.numberOfWeek  ,
      price: menu.value.price,
      idNumber: menu.value.idNumber,
      partOfMenu: menu.value.partOfMenu,
      urlOfImage : '',
      note : menu.value.note,
      weight : menu.value.weight,
    }

    if (menu.valid) {
      this.server.addItem(item).subscribe(() => {
        menu.reset();
        window.location.reload();
      })
    }
  }


  getAllItems() {
    this.server.getItem().pipe(
      map(response => {
        let post = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post
      })).subscribe(data => {
        this.allMenu = data
      })
  }

  filterByPartOfMenu(query: string) {
    this.showMenu = this.allMenu.filter(item => item.partOfMenu === query);
    this.checkedPartOfMenu = query;
  }

  changeDay(day: string){
    this.showMenu = this.allMenu.filter(item => item.dayOfWeek === day);
    this.checkedDay = day;

  }

  deleteItem(id: string) {
    this.server.deleteItem(id).subscribe(d => {
      
    })
  }

  ///// UPLOADING IMAGE

  upload($event: any) {
    this.path = $event.target.files[0]
    this.name = $event.target.files[0].name
  }

  async uploadImage(myId:  string) {
    console.log(this.path);
   const uploadTask = await this.angularFireStoreg.upload( myId , this.path );
   const url = await uploadTask.ref.getDownloadURL();
   this.urlOfImage = await url;
   await console.log(this.urlOfImage);
   await this.server.addUrlOfImage(myId, this.urlOfImage ).subscribe(d => window.location.reload())

  }

  
  submitNumberOfWeek(){
    if(confirm('Ви впевнені бажаєте змінити меню на тиждень номер ' + this.labelPosition )){
      console.log(this.labelPosition);
      this.server.changeWeekNumber(this.labelPosition).subscribe()
    } 
  }

  displayWeek(numberOfWeek: string){
    this.checkedNumberOfWeek = numberOfWeek;
    this.showMenu = this.allMenu.filter(item => item.numberOfWeek === numberOfWeek)
  }
  

}
