import {Component, Input, OnInit} from '@angular/core';
import {ArticleBody} from '../object-models/article';
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs/index";
import {ToastComponent} from '../toast/toast.component';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
  styleUrls: ['./article-container.component.css']
})
export class ArticleContainerComponent implements OnInit {

  @Input() articleCollection: Array<ArticleBody> = [];
  addToCart: boolean = false;
  hotelRef : string;

  constructor(private storage: AngularFireStorage, private fireStore: AngularFirestore) {

    var urlParams = new URLSearchParams(window.location.search);

    // console.log(urlParams.has('post')); // true
    // console.log(urlParams.get('action')); // "edit"
    // console.log(urlParams.getAll('action')); // ["edit"]
    // console.log(urlParams.toString()); // "?post=1234&action=edit"
    // console.log(urlParams.append('active', '1'));
    if (urlParams.has('searchRef')) {
      this.addToCart = true;
    }
  }


  ngOnInit() {
  }

  selectHotel(hotelRef: string) {
    localStorage.setItem('hotelRef', hotelRef);
    this.hotelRef = hotelRef;
    if (!this.addToCart) {
      let url = '/hotel?locale=' + 'en' + '&searchRef=' + hotelRef;
      location.href = url;
    } else {
      this.addToCartItem();
      //add to cart object and move to guest


    }
  }

    addToCartItem() {
      console.log('clicked');
      console.log('hotelref', this.hotelRef);
      this.fireStore.collection('cart').add({
        'hotelRef': this.hotelRef,
        'sessionID': 'ANSKFHIRO545138'
      }).then((res) => {
        ToastComponent.toastMessage = 'Added to cart !';
        ToastComponent.toast = true;
        ToastComponent.on_off_btn = false;

        ToastComponent.btnResponse.subscribe({
          next: (res) => {
            if (res == 'Ok') {
              console.log('Ok Clicked!');
              window.location.reload();
            }
          },
          error: (err) => console.log(err),
        });
      }).catch((error) => {
        console.error(error);
      });
    }
}
