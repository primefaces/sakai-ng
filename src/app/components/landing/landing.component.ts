import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  
  themeElement: any;

  constructor() { }

  ngOnInit(): void {
    let themeElement = document.getElementById('theme-css');
    this.themeElement = document.getElementById('theme-css');
    console.log(this.themeElement);
    themeElement.setAttribute('href','assets/theme/saga-blue/theme.css');
  }

  ngOnDestroy(): void {

  }

}
