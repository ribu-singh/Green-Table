import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ActionSheetController, LoadingController, Platform, PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { createEndpoint } from '../helpers/helper';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PopoverContentPageComponent } from '../components/popover-content-page/popover-content-page.component';
// import * as EventEmitter from 'node:events';
import * as appGlobals from '../app.globals';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public cardData = [];
  public userdata: any;
  public commentsData: any;
  public isuploading = false;
  public isSelfLike = false;
  public likesData: any;
  public postLikeData: any;
  public userDetails: any;
  public id: number;
  public isuserData = false;
  public imgUrl = appGlobals.imgUrl;

  public isGoogleLogin = false;
  public isShowLikes: boolean = false;
  public isshowComments = false;
  userImg: any = '';
  base64Img = '';
  userInputElement: HTMLInputElement;
  @ViewChild('userInput') userInputViewChild: ElementRef;
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true
  }



  // addNewItem(value: string) {
  //   this.newItemEvent.emit(this.postLikeData);
  // }

  constructor(private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private camera: Camera,
    private http: HttpClient,

    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private router: Router,
    private navControl: NavController, private statusBar: StatusBar, private popover: PopoverController, private splashScreen: SplashScreen) {
    // this.cardData = [{ profilename: 'Preeti Singh', posttext: 'We have Planted 30 Tress And Cleaned 3 Roads!' },
    // { profilename: 'Arjun Jain', posttext: 'We Are Working On An Initiative To Plant More Trees!' },
    // { profilename: 'Payal Saxena', posttext: 'New Baby In The House' },
    // { profilename: 'Rohan Jain', posttext: 'Plants!' },
    // { profilename: 'Arjun Singh', posttext: 'We have Planted 30 Tress And Cleaned 3 Roads' },]


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    })
    this.userImg = 'assets/imgs/logo.png';
  }
  openCamera() {
    this.camera.getPicture(this.cameraOptions).then((imgData) => {
      console.log('image data =>  ', imgData);
      this.base64Img = 'data:image/jpeg;base64,' + imgData;
      this.userImg = this.base64Img;
    }, (err) => {
      console.log(err);
    })

  }


  ngOnInit() {
    this.userDetails = localStorage.getItem('userDetails');
    this.userDetails = this.userDetails ? JSON.parse(this.userDetails) : undefined;
    this.id = this.userDetails.userDetails.user.id;
    this.getUserDetails();


  }
  getUserDetails() {
    this.isuserData = false;
    const p = new Promise((resolve, reject) => {
      const sendurl = (`${createEndpoint('api/home')}`);
      this.http.get(sendurl).subscribe((done) => {
        resolve(done);
        for (let i = 0, d; d = done[i]; i++) {
          d['isSelfLike'] = false;
          d['like'] = false;
          if (d && d.likes === "[]") {
          } else {
            let lk = JSON.parse(d.likes);
            if (lk && lk.length > 0) {
              for (let j = 0, l; l = lk[j]; j++) {
                if (l && l.profileId && l.profileId === this.id) {
                  d.isSelfLike = true;
                  // l.profileMedia
                }
              }
              d['likesData'] = lk;
              this.postLikeData = lk;
              localStorage.setItem(appGlobals.localStorageKeys.likeData, JSON.stringify(this.postLikeData));
            }
          }
          if (d && d.comments) {
            this.commentsData = JSON.parse(d.comments);
            d['commentsData'] = this.commentsData;
          }
        }
        this.isuserData = true;
        this.userdata = done;
      }, (err) => {
        this.isuserData = false;
        reject(err);
      });
    });
    return p;
  }

  mediaUrl(mediaFileNameOrUrl: string) {
    return appGlobals.utils.mediaUrl(mediaFileNameOrUrl);
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
      window.localStorage.removeItem('userDetails');
      this.router.navigate(['login']);
    });
  }

  async loadImageActionSheet1() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons: [{
        text: 'From Device',
        icon: 'laptop-outline',
        handler: () => {
          this.userInputElement.click();
        }
      }, {
        text: 'From Camera',
        icon: 'camera',
        handler: () => {
          this.openCamera();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });

    await actionSheet.present();
  };

  readSelectedFile($event) {
    let self = this;
    const files = $event.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      console.log(reader.result);//base64encoded string
      self.uploadFile(files[0], reader.result);
    };
  }

  async uploadFile(f, base) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: ''
    });
    await loading.present();
    this.isuploading = true;
    const p = new Promise((resolve, reject) => {
      const blob = this.convertBase64ToBlob(base);
      const formData = new FormData();
      formData.append('file', blob, f.name);
      this.http.post(`${createEndpoint('api/home')}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).subscribe((res: any) => {

        resolve(res);
        this.isuploading = false;
        loading.dismiss();

        console.log(res);
      }, (err) => {
        reject(err);
        this.isuploading = false;
        loading.dismiss();
      });
    });
    return p;

  }

  getInfoFromBase64(base64: string) {
    const meta = base64.split(',')[0];
    const rawBase64 = base64.split(',')[1].replace(/\s/g, '');
    const mime = /:([^;]+);/.exec(meta)[1];
    const extension = /\/([^;]+);/.exec(meta)[1];

    return {
      mime,
      extension,
      meta,
      rawBase64
    };
  }

  convertBase64ToBlob(base64: string) {
    const info = this.getInfoFromBase64(base64);
    const sliceSize = 512;
    const byteCharacters = window.atob(info.rawBase64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: info.mime });
  }

  showLikes() {
    this.isshowComments = false;
    this.isShowLikes = !this.isShowLikes;
  }

  showComments() {
    this.isShowLikes = false;
    this.isshowComments = !this.isshowComments;
  }

  addLike(id) {
    const body = id;
    const p = new Promise((resolve, reject) => {
      this.http.post(`${createEndpoint('api/like/' + body)}`, body).subscribe((res: any) => {
        resolve(res);
        this.getUserDetails();
      }, (err) => {
        reject(err);
      });
    });
  }

  async showLikess(ev: any, user) {
    user.like = true;
    // this.isshowComments = false;
    // this.isShowLikes = !this.isShowLikes;
    const pop = await this.popover.create({
      component: PopoverContentPageComponent,
      cssClass: 'my-custom-class',
      event: ev,
    });
    return await pop.present();

  }

  ngAfterViewInit() {
    this.userInputElement = this.userInputViewChild.nativeElement;
  };

}
