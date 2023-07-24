import { Component, OnInit } from '@angular/core';
import { first, map, takeUntil } from 'rxjs';
import { ServerService } from 'src/app/services/server.service';
import { Discount } from 'src/app/shared/Discount';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { About } from 'src/app/shared/About';
import { AboutGallery } from 'src/app/shared/AboutGallery';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent  extends SubjectService implements OnInit {

  allDiscounts: Discount[] = [];
  allAbout: About[] = [];
  allAboutGallery: AboutGallery[] = []

    /// Image variables 
    path: string = '';
  name: string = '';
  urlOfImage: string = '';

  constructor(private serverService: ServerService, private angularFireStoreg: AngularFireStorage) { 
    super()
  }

  ngOnInit(): void {
    this.getAllDiscount();
    this.getAllAbout();
    this.getAllAboutGallery();
  }
 /////////////////  ABOUT-US ///////////

 addAbout(newAbout: string){
  let about: About ={
    text : newAbout
  }
  this.serverService.addAbout(about).pipe(
    takeUntil(this.unsubscribe$)
  ).subscribe(d => { window.location.reload()})
 }

 deleteAbout(id: string) {
  this.serverService.deleteAbout(id).pipe(
    takeUntil(this.unsubscribe$)
  ).subscribe(d => {
    window.location.reload()
  })
}
  getAllAbout() {
    this.serverService.getAllAbout().pipe(
      takeUntil(this.unsubscribe$),
      map(response => {
        let post = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post
      })).subscribe(d => {
        this.allAbout = d;
      })
  }

  changeTextAbout(id: string, text: string) {
    if (confirm('Прийняти зміни ?')) {
      let newAbout: About = {
        text: text,
      }
      this.serverService.changeTextAbout(newAbout, id).pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe(d => {
        window.location.reload()
      })
    }
  }

    //adding image to about-us

    async uploadImageAbout(myId: string) {
      const uploadTask = await this.angularFireStoreg.upload(myId, this.path);
      const url = await uploadTask.ref.getDownloadURL();
      this.urlOfImage = await url;
      await this.serverService.addUrlOfImageAbout(myId, this.urlOfImage).subscribe(d => window.location.reload())
    }
  
    ////About-us gallery
    
  getAllAboutGallery() {
    this.serverService.getAllAboutGallery().pipe(
      takeUntil(this.unsubscribe$),
      map(response => {
        let post = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post
      })).subscribe(d => {
        this.allAboutGallery = d;
      })
  }


    async uploadImageAboutGallery(myId: string) {
      const uploadTask = await this.angularFireStoreg.upload(myId, this.path);
      const url = await uploadTask.ref.getDownloadURL();
      this.urlOfImage = await url;
      await this.serverService.addUrlOfImageAboutGallery(myId, this.urlOfImage).subscribe(d => window.location.reload())
    }


    //////////////// DISCOUNTS //////////////////

    addDiscount(newDiscount: string, headerDiscount: string){
      let discount: Discount ={
        text : newDiscount,
        header: headerDiscount,
      }

      this.serverService.addDiscount(discount).pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe(d => { window.location.reload()})
     }
    
     deleteDiscount(id: string) {
      this.serverService.deleteDiscount(id).pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe(d => {
        window.location.reload()
      })
    }

  getAllDiscount() {
    this.serverService.getAllDiscounts().pipe(
      takeUntil(this.unsubscribe$),
      map(response => {
        let post = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post
      })).subscribe(d => {
        this.allDiscounts = d;
      })
  }

  changeTextDiscount(id: string, text: string, header: string) {
    if (confirm('Прийняти зміни ?')) {
      let newDiscount: Discount = {
        text: text,
        header: header,
        idNumber: id,
      }
      this.serverService.changeTextDiscount(newDiscount, id).pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe(d => {
        window.location.reload()
      })
    }
  }


  // adding image to discount
  upload($event: any) {
    this.path = $event.target.files[0]
    this.name = $event.target.files[0].name
  }

  async uploadImageDiscount(myId: string) {
    const uploadTask = await this.angularFireStoreg.upload(myId, this.path);
    const url = await uploadTask.ref.getDownloadURL();
    this.urlOfImage = await url;
    await this.serverService.addUrlOfImageDiscount(myId, this.urlOfImage).subscribe(d => window.location.reload())
  }







}
