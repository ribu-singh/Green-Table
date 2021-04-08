import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { createEndpoint } from '../helpers/helper';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public cardData = [];
  public userdata: any;
  public isuserData= false;
  public isGoogleLogin = false;

  constructor(private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private http: HttpClient,
    private platform: Platform,
    private router: Router,
    private navControl: NavController) {
    this.cardData = [{ profilename: 'Preeti Singh', posttext: 'We have Planted 30 Tress And Cleaned 3 Roads!' },
    { profilename: 'Arjun Jain', posttext: 'We Are Working On An Initiative To Plant More Trees!' },
    { profilename: 'Payal Saxena', posttext: 'New Baby In The House' },
    { profilename: 'Rohan Jain', posttext: 'Plants!' },
    { profilename: 'Arjun Singh', posttext: 'We have Planted 30 Tress And Cleaned 3 Roads' },]


  }


  ngOnInit() {
    this.getUserDetails();
  }
  getUserDetails() {
    const p = new Promise((resolve, reject) => {
      const sendurl = (`${createEndpoint('api/homecontent')}`);
      this.http.get(sendurl).subscribe((done) => {
        resolve(done);
        this.isuserData = true;
        this.userdata = done;
      }, (err) => {
        reject(err);
      });
    });
    return p;
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
      this.router.navigate(['login']);
    });
  }

}
