import {Component, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit {

  @Output() showMobileMenu = new EventEmitter();
  mobileMenuButtonStatus: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  clickMobileMenu() {
    this.mobileMenuButtonStatus = !(this.mobileMenuButtonStatus);
    this.showMobileMenu.emit(this.mobileMenuButtonStatus);
  }

}
