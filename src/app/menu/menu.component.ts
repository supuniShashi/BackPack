import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() showMenu: boolean = false;
  @Input() selectedTab: string = 'MyThings';
  @Output() selectNewTab = new EventEmitter();
  imageURL:string;

  constructor() {
    this.imageURL = '../../assets/images/backpack2.png';
  }

  ngOnInit() {
  }

  selectTab(tabName: string) {

    if (this.selectedTab != tabName) {
      window.scrollTo(0, 0);
    }

    this.selectedTab = tabName;
    this.selectNewTab.emit(this.selectedTab);

  }

}
