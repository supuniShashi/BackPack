import { Component, OnInit } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {throwErrorIfNoChangesMode} from '@angular/core/src/render3/errors';
import {ToastComponent} from '../toast/toast.component';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  title: string;
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  phone: number;
  nationality: string;
  country: string;

  houseKeeping: boolean;
  meal: boolean;
  wheelChair: boolean;

  terms: boolean;

  task: AngularFireUploadTask;


  constructor(private storage: AngularFireStorage, private fireStore: AngularFirestore) {
  }


  ngOnInit() {
  }

  updateGuestDatabase() {
    console.log('clicked');

    console.log('title', this.title,
      'firstName', this.firstName,
      'lastName', this.lastName,
      'dob', this.dob,
      'email', this.email,
      'phone', this.phone,
      'nationality', this.nationality,
      'country', this.country,
      'meal', this.meal,
      'houseKeeping', this.houseKeeping,
      'wheelChair', this.wheelChair,
      'terms', this.terms);
    this.fireStore.collection('guest').add({
      'title': this.title,
      'firstName': this.firstName,
      'lastName': this.lastName,
      'dob': this.dob,
      'email': this.email,
      'phone': this.phone,
      'nationality': this.nationality,
      'country': this.country,
      'meal': this.meal,
      'houseKeeping': this.houseKeeping,
      'wheelChair': this.wheelChair,
      'terms': this.terms
    }).then((res) => {
      ToastComponent.toastMessage = 'Successfully Updated!';
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
