import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { createEndpoint } from 'src/app/helpers/helper';

@Component({
  selector: 'app-popover-content-page',
  templateUrl: './popover-content-page.component.html',
  styleUrls: ['./popover-content-page.component.scss'],
})
export class PopoverContentPageComponent implements OnInit {

  public likeData: any;
  public id: number;
  public userdata: any;
  public data: any = undefined;
  @Input() postLikeData: any;
  public isuserData = false;
  public isShowLikes: boolean = false;

  constructor(private http: HttpClient,) { }

  ngOnInit() {
    this.likeData = localStorage.getItem('likeData');
    this.likeData = this.likeData ? JSON.parse(this.likeData) : undefined;
    // this.id = this.userDetails.userDetails.user.id;
    this.data = this.likeData;


    // this.postLikeData;
    // console.log(this.postLikeData);
    // this.data = this.postLikeData;
    // this.getData();
  }

  // async getData() {
  //   if (this.postLikeData && this.postLikeData.length > 0) { this.data = this.postLikeData; }
  //   await this.data;
  //   console.log(this.data);
  // }


}
