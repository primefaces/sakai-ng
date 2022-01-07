import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let themeElement = document.getElementById('theme-css');
    themeElement.setAttribute('href','assets/theme/saga-blue/theme.css');
  }

}
