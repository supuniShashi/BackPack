import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth-service/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {SpinnerService} from '../spinner/spinner-service.service';
import {ArticleBody} from '../object-models/article';
import {AngularFirestoreCollection} from '@angular/fire/firestore';

@Component({
  selector: 'hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelComponent implements OnInit {
  articleCollection: Array<ArticleBody> = [];
  articleCollectionFB: AngularFirestoreCollection<ArticleBody>;
  article: any;
  hotelRef: string;

  constructor(private fireStore: AngularFirestore, private spinnerService: SpinnerService, private authService: AuthService) {
    const urlParams = new URLSearchParams(window.location.search);
    this.hotelRef = urlParams.get('searchRef');

    const article = this.fireStore.collection('articles', ref => {
      return ref.where('hotelRef', '==', this.hotelRef);
    });

    this.article = article.valueChanges();

    this.article.subscribe((res) => {
      this.articleCollection = res;
      console.log(' this.article', this.articleCollection);
    });
  }

  ngOnInit() {

    console.log('$$$$$$$$$$$$$$$$$');
  }

}
