import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() imageURL: string;
  @Input() articleName: string;
  @Input() articleDate: string;
  @Input() articleDescription: string;
  @Input() hotelRef: string;
  @Output() proceed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  bookNow()
  {
    this.proceed.emit(this.hotelRef);
    console.log('this.hotelRef',this.hotelRef);
  }

}
