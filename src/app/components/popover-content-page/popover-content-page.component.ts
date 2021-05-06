import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { createEndpoint } from 'src/app/helpers/helper';

@Component({
  selector: 'app-popover-content-page',
  templateUrl: './popover-content-page.component.html',
  styleUrls: ['./popover-content-page.component.scss'],
})
export class PopoverContentPageComponent implements OnInit {

  public id: number;
  @Input() likeData: string;
  public isuserData = false;
  public isShowLikes: boolean = false;

  constructor(private http: HttpClient,public modalController: ModalController) { }

  ngOnInit() {

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
