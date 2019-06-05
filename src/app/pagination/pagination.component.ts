import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pageination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PageinationComponent implements OnInit {

  @Input() start: number;
  @Input() end: number;

  @Output() currentPage: any = new EventEmitter();

  itemArray: any = [];
  currentSelectedPage: number = 1;

  constructor() {
  }

  ngOnInit() {
    for (var num = this.start; num <= this.end; num++) {
      this.itemArray.push(num);
    }
  }

  clickArrow(directions) {
    if (directions == 'next') {
      if ((this.itemArray.length) >= (this.currentSelectedPage + 1)) {
        this.currentSelectedPage = this.currentSelectedPage + 1;
      }
    }
    if (directions == 'previous') {
      if (this.currentSelectedPage > 1) {
        this.currentSelectedPage = this.currentSelectedPage - 1;
      }
    }
    this.currentPage.emit(this.currentSelectedPage);
  }

  clickPageNumber(pageNumber) {
    this.currentSelectedPage = pageNumber;
    this.currentPage.emit(this.currentSelectedPage);
  }

}
