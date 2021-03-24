import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  public coinData = [];

  constructor(private navControl: NavController) {
    this.coinData = [{ time: '18-Feb 5:15 PM', coinCredited: '20' },
    { time: '14-Feb 5:15 PM', coinCredited: '54' },
    { time: '18-Feb 5:45 AM', coinCredited: '40' },
    { time: '19-Feb 4:15 PM', coinCredited: '55' },
    { time: '20-Feb 8:15 PM', coinCredited: '28' },
    { time: '25-Feb 8:15 AM', coinCredited: '5' },]
  }

  ngOnInit() { }


  back() {
    this.navControl.pop();
  }
}
