import {Component, NgModule, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../auth-service/auth.service";
import {SpinnerService} from "../spinner/spinner-service.service";
import {ArticleBody} from "../object-models/article";
import {AdminLoginComponent} from "../admin-login/admin-login.component";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'backPackHome',
  templateUrl: './backPackHome.component.html',
})
export class BackPackHomeComponent implements OnInit {

  adminMode: boolean = false;

  showMenu: boolean = false;
  isPageLoading: boolean = true;
  selectedTab: string = 'MyThings';
  adminMenuSelectedTab: string = 'Insert';

  paginationStart: number = 1;
  paginationEnd: number = 5;

  articleCollection: Array<ArticleBody> = [];
  articleCollectionFB: AngularFirestoreCollection<ArticleBody>;
  article: Observable<ArticleBody[]>;
  numberOfArticles: number;

  imageURL: string = '../../assets/images/404.jpg';
  articleName: string;
  articleDate: string;
  articleDescription: string;
  fullArticle: any;

  constructor(private fireStore: AngularFirestore, private spinnerService: SpinnerService, private authService: AuthService) {
    this.articleCollectionFB = fireStore.collection('articles', ref => {
      return ref.orderBy('articleNumber');
    });

    this.article = this.articleCollectionFB.valueChanges();

    this.article.subscribe((res) => {
      this.articleCollection = res;
      this.numberOfArticles = res.length;
    });

    spinnerService.getSpinnerValue().subscribe((value) => {
      this.spinnerArticleTab(value);
    }, (error) => {
      console.log(error);
    })


    setTimeout(() => {
      this.isPageLoading = false;
    }, 3000);
  }

  ngOnInit() {

    console.log("homePage")
  }

  clickMobileMenubtn(event) {
    this.showMenu = event;
  }

  changeContent(selectedTab) {
    this.selectedTab = selectedTab;
  }

  adminMenuChangeContent(adminMenuSelectedTab) {
    this.adminMenuSelectedTab = adminMenuSelectedTab;

    if (adminMenuSelectedTab == 'Update') {
    }
    if (adminMenuSelectedTab == 'Delete') {
    }
  }

  currentPageNumber(pageNumber) {
    console.log(pageNumber);
  }

  adminLogin(event) {
    if (event == 5) {
      console.log('%c Admin Mode Toggled', 'color: #e67e22; font-weight: bold;');
      if (!this.adminMode) {
        AdminLoginComponent.adminLogin = true;
      } else {
        this.authService.signOut();
        window.location.reload();
      }
    }
  }

  goAdminFlow() {
    this.adminMode = !(this.adminMode);
    this.resetAdminMenuSelectedTab();
    window.scrollTo(0, 0);
  }

  resetAdminMenuSelectedTab() {
    this.adminMenuSelectedTab = 'Insert';
  }

  spinnerArticleTab(articleNumber: number) {
    this.fireStore.collection('articles', ref => {
      return ref.where('articleNumber', '==', articleNumber)
    }).valueChanges().subscribe((res) => {
      if (res[0]) {
        this.fullArticle = res[0];
        this.imageURL = res[0]['imageURL'];
        this.articleName = res[0]['articleName'];
        this.articleDate = res[0]['articleDate'];
        this.articleDescription = res[0]['articleDescription'];
      }
    }, (error) => {
      console.log(error);
    });
  }
}
