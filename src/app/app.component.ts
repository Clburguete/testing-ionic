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
  rootPage: any = CameraPrevPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public camerapreview: CameraPreview, private alertCtrl: AlertController) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


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



  showAlert(test) {
    let alert = this.alertCtrl.create({
      title: test,
      buttons: ['OK']
    })
    alert.present();
  }
}
