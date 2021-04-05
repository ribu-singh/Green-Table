import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public cardData = [];
  public userdata = [];
  public isGoogleLogin = false;
  http: any;

  constructor(private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
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
    // this.getCarddata;
  }
  // getCarddata() {
  //   const p = new Promise((resolve, reject) => {
  //     this.http.get(link).subscribe((data) => {
  //       resolve(data);
  //       this.cardData = data;
  //     }, (err) => {
  //       reject(err);
  //       console.log(err);
  //     });
  //   });

  //   return p;
  // }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
      this.router.navigate(['login']);
    });
  }

}
