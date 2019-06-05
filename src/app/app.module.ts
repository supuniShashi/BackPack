import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ArticleComponent} from './article/article.component';
import {ArticleContainerComponent} from './article-container/article-container.component';
import {LoaderComponent} from './loader/loader.component';
import {MobileMenuComponent} from './mobile-menu/mobile-menu.component';
import {MenuComponent} from './menu/menu.component';
import {PageinationComponent} from './pagination/pagination.component';
import {FooterComponent} from './footer/footer.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminMenuComponent} from './admin-menu/admin-menu.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {ToastComponent} from './toast/toast.component';
import {ArticleSkeletonComponent} from './article-skeleton/article-skeleton.component';
import {FileSizePipePipe} from './custom-pipes/file-size-pipe.pipe';
import {DropZoneDirectiveDirective} from './custom-directives/drop-zone-directive.directive';
import {AngularFireModule} from 'angularfire2';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import {ButtonHoldDirective} from './custom-directives/button-hold.directive';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AuthService} from "./auth-service/auth.service";
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleContainerComponent,
    LoaderComponent,
    MobileMenuComponent,
    MenuComponent,
    PageinationComponent,
    FooterComponent,
    AboutMeComponent,
    AdminMenuComponent,
    SpinnerComponent,
    ToastComponent,
    ArticleSkeletonComponent,
    FileSizePipePipe,
    DropZoneDirectiveDirective,
    ButtonHoldDirective,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
