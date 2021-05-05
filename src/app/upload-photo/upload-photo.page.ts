import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, LoadingController, NavController, Platform } from '@ionic/angular';
import { createEndpoint } from '../helpers/helper';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-picture',
  templateUrl: './upload-photo.page.html',
  styleUrls: ['./upload-photo.page.scss'],
})
export class PicturePage implements OnInit {
  images = [];
  public userDetails: any;

  myImage = null;
  croppedImage = null;
  @ViewChild(ImageCropperComponent, { static: false }) angularCropper: ImageCropperComponent;
  public photos: any;
  public base64Image: string;

  userInputElement: HTMLInputElement;
  public isuploading = false;
  userImg: any = '';
  base64Img = '';
  @ViewChild('userInput') userInputViewChild: ElementRef;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true
  }

  constructor(private http: HttpClient, private statusBar: StatusBar,
    private navControl: NavController,
    private splashScreen: SplashScreen,
    private platform: Platform, private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
    public alertController: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    })
    this.userImg = 'assets/imgs/logo.png';
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

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
    this.photos = [];
  }

  captureImage() {
    // this.convertFileToDataURLviaFileReader(`assets/images/plants.jpg`).subscribe(
    //   base64 => {
    //     this.myImage = base64;
    //   }
    // );

    const option: CameraOptions = {
      quality: 55,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(option).then((imageData) => {
      this.myImage = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.croppedImage);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  convertFileToDataURLviaFileReader(url: string) {
    return Observable.create(observer => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onload = function () {
        let reader: FileReader = new FileReader();
        reader.onloadend = function () {
          observer.next(reader.result);
          observer.complete();
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  clear() {
    this.angularCropper.imageBase64 = null;
    this.myImage = null;
    this.croppedImage = null;
  }

  save() {
    this.angularCropper.crop();
  }

  move(x, y) {
    this.angularCropper.cropper.x1 += x;
    this.angularCropper.cropper.x2 += x;
    this.angularCropper.cropper.y1 += y;
    this.angularCropper.cropper.y2 += y;
  }

  async deletePhoto(index) {
    const alert = await this.alertController.create({
      header: 'Sure you want to delete this photo?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
          }
        }
      ]
    });

    await alert.present();
  }

  get f() {
    return this.myForm.controls;
  }

  back() {
    this.navControl.pop();
  }

  // onFileChange(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       var reader = new FileReader();

  //       reader.onload = (event: any) => {
  //         console.log(event.target.result);
  //         this.images.push(event.target.result);

  //         this.myForm.patchValue({
  //           fileSource: this.images
  //         });
  //       }

  //       reader.readAsDataURL(event.target.files[i]);
  //     }
  //   }
  // }


  submit() {
    console.log(this.myForm.value);
    this.http.post('http://localhost:5001/api/home', this.myForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
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

  readSelectedFile(event) {
    let self = this;
    const files = event.target.files;
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        console.log(event.target.result);
        this.images.push(event.target.result);
        self.uploadFile(files[0], reader.result);
        this.myForm.patchValue({
          fileSource: this.images
        });
      }
      reader.readAsDataURL(event.target.files[i]);
    }
    // reader.onload = function () {
    //   console.log(reader.result);//base64encoded string
    //   self.uploadFile(files[0], reader.result);
    // };

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

  ngAfterViewInit() {
    this.userInputElement = this.userInputViewChild.nativeElement;
  };
}
