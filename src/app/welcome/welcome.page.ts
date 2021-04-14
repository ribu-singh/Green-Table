import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ActionSheetController, LoadingController, Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { createEndpoint } from '../helpers/helper';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public cardData = [];
  public userdata: any;
  public isuserData = false;
  public isGoogleLogin = false;
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

  constructor(private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private camera: Camera,
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private router: Router,
    private navControl: NavController, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    this.cardData = [{ profilename: 'Preeti Singh', posttext: 'We have Planted 30 Tress And Cleaned 3 Roads!' },
    { profilename: 'Arjun Jain', posttext: 'We Are Working On An Initiative To Plant More Trees!' },
    { profilename: 'Payal Saxena', posttext: 'New Baby In The House' },
    { profilename: 'Rohan Jain', posttext: 'Plants!' },
    { profilename: 'Arjun Singh', posttext: 'We have Planted 30 Tress And Cleaned 3 Roads' },]


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
    this.getUserDetails();
  }
  getUserDetails() {
    this.isuserData = false;
    const p = new Promise((resolve, reject) => {
      const sendurl = (`${createEndpoint('api/home')}`);
      this.http.get(sendurl).subscribe((done) => {
        resolve(done);
        this.isuserData = true;
        this.userdata = done;
      }, (err) => {
        this.isuserData = false;
        reject(err);
      });
    });
    return p;
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
      // self.uploadFile(files[0], reader.result);
    };
  }

  ngAfterViewInit() {
    this.userInputElement = this.userInputViewChild.nativeElement;
  };

}
