import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview'
import { HomePage } from '../pages/home/home';
import { CameraPrevPage } from '../pages/camera-prev/camera-prev'
import * as firebase from 'firebase'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = CameraPrevPage;
  picture: string = null;
  pictureOpts: CameraPreviewPictureOptions = {
    width: window.screen.width,
    height: window.screen.height,
    quality: 85,
};
  image:string = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public camerapreview: CameraPreview, private alertCtrl: AlertController) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      const cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width ,
        height: window.screen.height ,
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

      var config = {
        apiKey: "AIzaSyAzF52-Ao6iK95hp_MMrz2Bqe1iJkBRvBk",
        authDomain: "test-camera.firebaseapp.com",
        databaseURL: "https://test-camera.firebaseio.com",
        projectId: "test-camera",
        storageBucket: "test-camera.appspot.com",
        messagingSenderId: "649043200116"
      };
      firebase.initializeApp(config);
    });
  }

  takePicture(){
    this.camerapreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      let storageRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      const imageRef = storageRef.child(`images/${filename}.jpg`);
      imageRef.putString(this.picture, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
        this.showAlert("IMAGE UPLOADED")

      });



    }, (err) => {
      console.log(err);
    });
  }

  upload(){
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    imageRef.putString(this.image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      this.showAlert("IMAGE UPLOADED")
    });
  }

  showAlert(test) {
     let alert = this.alertCtrl.create({
       title: test,
       buttons: ['OK']
     })
     alert.present();
   }
}
