// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-crop',
  templateUrl: './crop.page.html',
  styleUrls: ['./crop.page.scss'],
})
export class CropPage implements OnInit {
  myImage = null;
  croppedImage = null;
  @ViewChild(ImageCropperComponent, { static: false}) angularCropper: ImageCropperComponent;
  public photos : any;
  public base64Image : string;
  alertCtrl: any;
  

  constructor(private camera: Camera, alertCtrl : AlertController) { }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

  }

  ngOnInit() {
    this.photos = [];
  }

  captureImage(){
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
      xhr.onload = function() { 
        let reader: FileReader = new FileReader();
        reader.onloadend = function() {
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

  deletePhoto(index){
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo? There is NO undo!',
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
    confirm.present();
  }

  clear() {
    this.angularCropper.imageBase64 = null;
    this.myImage = null;
    this.croppedImage = null;
  }

  save() {
    this.angularCropper.crop();
  }

  // rotateLeft() {
  //   this.angularCropper.rotateleft();
  // }

  // rotateRight() {
  //   this.angularCropper.rotateRight();
  // }

  // flipHorizontal() {
  //   this.angularCropper.flipHorizontal();
  // }

  // flipVertical() {
  //   this.angularCropper.flipVertical();
  // }

  move(x, y) {
    this.angularCropper.cropper.x1 += x;
    this.angularCropper.cropper.x2 += x;
    this.angularCropper.cropper.y1 += y;
    this.angularCropper.cropper.y2 += y;
  }

}
