import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs';
import { ServerService } from 'src/app/services/server.service';
import { Discount } from 'src/app/shared/Discount';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { About } from 'src/app/shared/About';
import { AboutGallery } from 'src/app/shared/AboutGallery';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  allDiscounts: Discount[] = [];
  allAbout: About[] = [];
  allAboutGallery: AboutGallery[] = []

    /// Image variables 
    path: string = '';
  name: string = '';
  urlOfImage: string = '';

  constructor(private serverService: ServerService, private angularFireStoreg: AngularFireStorage) { }

  ngOnInit(): void {
    this.getAllDiscount();
    this.getAllAbout();
    this.getAllAboutGallery();
  }
 /////////////////  ABOUT-US ///////////

  getAllAbout() {
    this.serverService.getAllAbout().pipe(
      map(response => {
        let post = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post
      })).subscribe(d => {
        console.log(d)
        this.allAbout = d;
        console.log(this.allAbout)
      })
  }

  changeTextAbout(id: string, text: string) {
    if (confirm('Прийняти зміни ?')) {
      let newAbout: About = {
        text: text,
      }
      this.serverService.changeTextAbout(newAbout, id).subscribe(d => {
        window.location.reload()
      })
    }
  }

    //adding image to about-us

    async uploadImageAbout(myId: string) {
      console.log(this.path);
      const uploadTask = await this.angularFireStoreg.upload(myId, this.path);
      const url = await uploadTask.ref.getDownloadURL();
      this.urlOfImage = await url;
      await console.log(this.urlOfImage);
      await this.serverService.addUrlOfImageAbout(myId, this.urlOfImage).subscribe(d => window.location.reload())
    }
  
    ////About-us gallery
    
  getAllAboutGallery() {
    this.serverService.getAllAboutGallery().pipe(
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
        console.log(this.allAboutGallery)
      })
  }


    async uploadImageAboutGallery(myId: string) {
      const uploadTask = await this.angularFireStoreg.upload(myId, this.path);
      const url = await uploadTask.ref.getDownloadURL();
      this.urlOfImage = await url;
      await console.log(this.urlOfImage);
      await this.serverService.addUrlOfImageAboutGallery(myId, this.urlOfImage).subscribe(d => window.location.reload())
    }


    //////////////// DISCOUNTS //////////////////

  getAllDiscount() {
    this.serverService.getAllDiscounts().pipe(
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
        console.log(this.allDiscounts)
      })
  }

  changeTextDiscount(id: string, text: string, header: string) {
    if (confirm('Прийняти зміни ?')) {
      let newDiscount: Discount = {
        text: text,
        header: header,
        idNumber: id,
      }
      this.serverService.changeTextDiscount(newDiscount, id).subscribe(d => {
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
    console.log(this.path);
    const uploadTask = await this.angularFireStoreg.upload(myId, this.path);
    const url = await uploadTask.ref.getDownloadURL();
    this.urlOfImage = await url;
    await console.log(this.urlOfImage);
    await this.serverService.addUrlOfImageDiscount(myId, this.urlOfImage).subscribe(d => window.location.reload())
  }







}