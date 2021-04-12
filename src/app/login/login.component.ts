import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, Routes } from '@angular/router';
// import { GooglePlusOriginal } from '@ionic-native/google-plus';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import firebase from 'firebase/app';
import { createEndpoint } from '../helpers/helper';
import * as appGlobals from '../app.globals';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loading: any;
  public isGoogleLogin = false;
  public user = null;
  public tokenKey: any;
  public userData: any = {};

  constructor(
    private google: GooglePlus,
    private http: HttpClient,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
    // this.getDetails();
  }

  /**
   * @description method to login in the app
   */
  doLogin() {
    let params: any;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          webClientId: '61367794172-g8ur3grf8jv3jt1eqit1o079ni778r5s.apps.googleusercontent.com', //  webclientID 'string'
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

        this.user = success.user;
        // const details =
        // {
        //   nickname: this.user.displayName,
        //   email: this.user.email,
        //   photo: this.user.photoURL,
        // }
        this.isGoogleLogin = true;
        this.getData().then((s: any) => {
          // if (s && s.user) {
          //   localStorage.setItem(appGlobals.localStorageKeys.userDetails, JSON.stringify(details));
          // }
        });

        // this.router.navigate(['welcome']);
      }).catch(err => {
        console.log(err.message, 'error in google login');
      });
    }
  }

  /**
   * @description to get firebase login credentials
   * @param accessToken 
   * @param accessSecret 
   */
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        alert('successfully');
        this.isGoogleLogin = true;
        this.user = success.user;
        this.getData();
        // this.router.navigate(['welcome']);
        this.loading.dismiss();
      });

  }

  /**
   * @description to get user data 
   * @returns 
   */
  getData() {
    const p = new Promise((resolve, reject) => {
      const sendurl = (`${createEndpoint('api/user')}`);
      const met = JSON.stringify(this.user);
      const data = {
        email: this.user.email,
        googleuid: this.user.uid,
        meta: met
      }
      this.http.post(sendurl, data).subscribe((done) => {
        resolve(done);
        this.tokenKey = done;
        const details =
        {
          nickname: this.user.displayName,
          email: this.user.email,
          photo: this.user.photoURL,
          userDetails: this.tokenKey,
        }
        if (done && this.user) {
          localStorage.setItem(appGlobals.localStorageKeys.userDetails, JSON.stringify(details));
        }
        this.router.navigate(['welcome']);
      }, (err) => {
        reject(err);
      });
    });
    return p;
  }

  getDetails() {
    const p = new Promise((resolve, reject) => {
      const sendurl = (`${createEndpoint('api/profile/1')}`);
      const body = {
        id: 1,
        firstname: "rghtx"
      }
      this.http.put(sendurl, body).subscribe((done) => {
        resolve(done);
        // this.router.navigate(['welcome']);
      }, (err) => {
        reject(err);
      });
    });
    return p;
  }

  /**
   * @description to record login error
   * @param err 
   */
  onLoginError(err) {
    console.log(err);
  }

  /**
   * @description to logout from the app
   */
  logout() {
    this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
      // window.localStorage.removeItem('token');
      this.router.navigate(['login']);
    });
  }

}
