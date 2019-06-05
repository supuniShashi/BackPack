import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  @Input() showMenu: boolean = false;
  @Input() adminMenuSelectedTab: string = 'Insert';
  @Output() adminMenuSelectNewTab = new EventEmitter();
  imageURL:string;

  constructor() {
    this.imageURL = '../../assets/images/backpack2.png';
  }

  ngOnInit() {
  }

  adminMenuSelectTab(tabName: string) {

    if (this.adminMenuSelectedTab != tabName) {
      window.scrollTo(0, 0);
    }

    this.adminMenuSelectedTab = tabName;
    this.adminMenuSelectNewTab.emit(this.adminMenuSelectedTab);

  }

}
