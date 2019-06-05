import {Component, Input, OnInit} from '@angular/core';
import {ArticleBody} from '../object-models/article';
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
  styleUrls: ['./article-container.component.css']
})
export class ArticleContainerComponent implements OnInit {

  @Input() articleCollection: Array<ArticleBody> = [];

  constructor() {
  }

  ngOnInit() {
  }

}
