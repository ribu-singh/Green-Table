import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, Routes } from '@angular/router';
// import { GooglePlusOriginal } from '@ionic-native/google-plus';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import firebase from 'firebase/app';
import * as appGlobals from '../app.globals';
import { createEndpoint } from '../helpers/helper';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loading: any;
  public isGoogleLogin = false;
  public user = null;

  public userData: any = {};

  constructor(
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }


  doLogin() {
    let params: any;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          webClientId: '<WEB_CLIENT_ID>', //  webclientID 'string'
          offline: true
        };
      } else {
        params = {};
      }
      this.google.login(params)
        .then((response) => {
          const { idToken, accessToken } = response;
          this.onLoginSuccess(idToken, accessToken);
        }).catch((error) => {
          console.log(error);
          alert('error:' + JSON.stringify(error));
        });
    } else {
      console.log('else...');
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
        console.log('success in google login', success);
        this.isGoogleLogin = true;
        if (success && success.user) {
          // localStorage.setItem(appGlobals.localStorageKeys.userProfile, JSON.stringify(success.user.uid));
          localStorage.setItem(appGlobals.localStorageKeys.userName, JSON.stringify(success.user.displayName));
          localStorage.setItem(appGlobals.localStorageKeys.email, JSON.stringify(success.user.email));
          localStorage.setItem(appGlobals.localStorageKeys.profilePic, JSON.stringify(success.user.photoURL));
        }
        this.user = success.user;
        this.router.navigate(['welcome']);
      }).catch(err => {
        console.log(err.message, 'error in google login');
      });
    }
  }


  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        alert('successfully');
        this.isGoogleLogin = true;
        this.user = success.user;
        this.router.navigate(['welcome']);
        this.loading.dismiss();
      });

  }

  getData() {
    const p = new Promise((resolve, reject) => {
      const sendurl = (`${createEndpoint('jobcard/reject')}`);
      const data = {
        name: this.user.displayName,
        email: this.user.email,
        meta: JSON.stringify(this.user),
      };
      // this.http.post(sendurl, data).subscribe((done) => {
      //   resolve(done);
      // }, (err) => {
      //   reject(err);
      // });
    });
    return p;
  }




  onLoginError(err) {
    console.log(err);
  }


  logout() {
    this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
      this.router.navigate(['login']);
    });
  }


}
