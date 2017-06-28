import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview'
import { ShareProvider } from '../../providers/share/share';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';




@Component({
  selector: 'page-camera-prev',
  templateUrl: 'camera-prev.html',
})
export class CameraPrevPage {

  picture: string = null;
  pictureOpts: CameraPreviewPictureOptions = {
    width: window.screen.width,
    height: window.screen.height,
    quality: 75,
  };
  image: string = null;

  constructor(private shareService: ShareProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private camerapreview: CameraPreview) {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };


    this.camerapreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        //this.showAlert(res)
      },
      (err) => {
        //this.showAlert(err)
      });

  }

  showAlert(test) {
    let alert = this.alertCtrl.create({
      title: test,
      buttons: ['OK']
    })
    alert.present();
  }

  takePicture() {
    this.camerapreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.shareService.setImage(this.picture)
      let storageRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      const imageRef = storageRef.child(`images/${filename}.jpg`);
      imageRef.putString(this.picture, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
        this.camerapreview.stopCamera();
        this.showAlert("IMAGE UPLOADED");
        this.navCtrl.push(HomePage)
      });
    }, (err) => {
      console.log(err);
    });
  }


}
