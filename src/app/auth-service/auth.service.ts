import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthService {

  authState: any = null;
  loginSuccess = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // emailSignUp(email: string, password: string) {
  //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       this.authState = user
  //     })
  //     .catch(error => console.log(error));
  // }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.loginSuccess.next(true);
      })
      .catch(error => {
        this.loginSuccess.next(false);
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.loginSuccess.next(false);
  }

}
