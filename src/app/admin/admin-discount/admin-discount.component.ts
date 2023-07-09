import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs';
import { ServerService } from 'src/app/services/server.service';
import { Discount } from 'src/app/shared/Discount';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  allDiscounts: Discount[] = [];
  test = [];

  /// Image variables 
  path: string = '';
  name: string = '';
  urlOfImage: string = '';

  constructor(private serverService: ServerService, private angularFireStoreg: AngularFireStorage){}

  ngOnInit(): void {
  this.getAllDiscount()
  }

  getAllDiscount(){
    this.serverService.getAllDiscounts().pipe(
            map(response => {
        let post = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post
      })).subscribe( d => {
        this.allDiscounts = d;
        console.log(this.allDiscounts)
      })
  }

  changeTextDiscount(id: string, text: string, header: string){
    if(confirm('Прийняти зміни ?')){
      let newDiscount: Discount ={
        text: text,
        header: header,
        idNumber: id,
      }
      this.serverService.changeTextDiscount(newDiscount, id).subscribe( d => {
        window.location.reload()
      })
    }
  }

  
  // adding image
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
   await this.serverService.addUrlOfImageDiscount(myId, this.urlOfImage ).subscribe(d => window.location.reload())
  }

 

}
