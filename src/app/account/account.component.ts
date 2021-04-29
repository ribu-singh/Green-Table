import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createEndpoint } from '../helpers/helper';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  public coinData: any;
  public userDetails: any;
  public setDob:any;
  public id: number;
  public userInfo: any;

  // public email: any;
  // public profilePic: any;

  constructor(private navControl: NavController, private http: HttpClient,) {
    // this.coinData = [{ time: '18-Feb 5:15 PM', coinCredited: '20' },
    // { time: '14-Feb 5:15 PM', coinCredited: '54' },
    // { time: '18-Feb 5:45 AM', coinCredited: '40' },
    // { time: '19-Feb 4:15 PM', coinCredited: '55' },
    // { time: '20-Feb 8:15 PM', coinCredited: '28' },
    // { time: '25-Feb 8:15 AM', coinCredited: '5' },]
  }

  ngOnInit() {
    this.userDetails = localStorage.getItem('userDetails');
    this.userDetails = this.userDetails ? JSON.parse(this.userDetails) : undefined;
    this.id = this.userDetails.userDetails.user.id;
    this.getDetails();
    this.getCoins();

  }



  getDetails() {
    const p = new Promise((resolve, reject) => {
      const sendurl = (`${createEndpoint('api/profileContoller/')}` + this.id);
      this.http.get(sendurl).subscribe((done) => {
        resolve(done);
        this.userInfo = done;
      }, (err) => {
        reject(err);
      });
    });
    return p;
  }

  getCoins() {
    const p = new Promise((resolve, reject) => {
      const sendurl = (`${createEndpoint('api/greencoinContoller')}`);
      this.http.get(sendurl).subscribe((done) => {
        resolve(done);
        this.coinData = done;
      }, (err) => {
        reject(err);
      });
    });
    return p;
  }

  back() {
    this.navControl.pop();
  }
}
