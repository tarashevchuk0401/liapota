import { Component, OnInit } from '@angular/core';
import { About } from '../shared/About';
import { ServerService } from '../services/server.service';
import { map } from 'rxjs';
import { AboutGallery } from '../shared/AboutGallery';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit{

  allAbout: About[] = [];
  allAboutGallery: AboutGallery[] = [];

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.getAllAbout();
    this.getAllAboutGallery()
  }

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
        this.allAbout = d;
      })
  }

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
      })
  }
}
