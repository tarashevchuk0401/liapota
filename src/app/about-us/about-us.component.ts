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
    this.serverService.getAllAbout().subscribe(d => {
        this.allAbout = d;
      })
  }

  getAllAboutGallery() {
    this.serverService.getAllAboutGallery().subscribe(d => {
        this.allAboutGallery = d;
        console.log(this.allAboutGallery)
      })
  }
}
