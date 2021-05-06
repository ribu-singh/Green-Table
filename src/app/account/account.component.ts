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
  public showData: boolean = false;
  public userDetails: any;
  public coinscount: number;
  public id: number;
  public userInfo: any;


  constructor(private navControl: NavController, private http: HttpClient,) {
  }

  ngOnInit() {
    this.userDetails = localStorage.getItem('userDetails');
    this.userDetails = this.userDetails ? JSON.parse(this.userDetails) : undefined;
    this.id = this.userDetails.userDetails.user.id;
    this.getDetails();

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
      this.getCoins();
    });
    return p;
  }

  getCoins() {
    this.showData = false;
    const p = new Promise((resolve, reject) => {
      const sendurl = (`${createEndpoint('api/greencoinContoller')}`);
      this.http.get(sendurl).subscribe((done) => {
        resolve(done);
        this.coinData = done;
        for (let i = 0, d, b = 0; d = done[i]; i++) {
          var a = d.coins
          b = a + b;
          if (this.coinData.length === i + 1) {
            this.coinData['coinscount'] = b;
          }
        }
        this.showData = true;
      }, (err) => {
        reject(err);
        this.showData = false;
      });
    });
    return p;
  }

  back() {
    this.navControl.pop();
  }
}
