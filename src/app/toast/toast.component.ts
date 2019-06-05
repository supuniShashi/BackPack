import {Component, Input, OnInit} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  static toast: boolean = false;
  static on_off_btn: boolean = true;
  static btnResponse: any;
  static toastMessage: string;

  constructor() {
  }

  ngOnInit() {
  }

  clickToastBtn(event, btn) {
    ToastComponent.toast = false;

    if (btn == 'Yes') {
      ToastComponent.btnResponse.next('Yes');
    }
    if (btn == 'No') {
      ToastComponent.btnResponse.next('No');
    }
    if (btn == 'Ok') {
      ToastComponent.btnResponse.next('Ok');
    }
  }

  static reset() {
    ToastComponent.btnResponse = new ReplaySubject();
  }

  get staticToast() {
    return ToastComponent.toast;
  }

  get staticOn_off_btn() {
    return ToastComponent.on_off_btn;
  }

  get toastMessage() {
    return ToastComponent.toastMessage;
  }
}
