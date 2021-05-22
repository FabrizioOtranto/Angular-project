import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public email: string;


  constructor() { 
    this.title = 'Fabrizio Otranto'
    this.subtitle = 'Desarrollador web y profesor'
    this.email = 'Fabryotranto@gmail.com'

  }

  ngOnInit(): void {
  }

}
