import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview'

/**
 * Generated class for the CameraPrevPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-camera-prev',
  templateUrl: 'camera-prev.html',
})
export class CameraPrevPage {

  picture: string = null;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private camerapreview: CameraPreview) {
    this.showAlert("LLEGA A LA PAGINA")


  }

  ionViewDidLoad() {
    this.showAlert("LLEGA A LA PAGINA")
  }
  showAlert(test) {
     let alert = this.alertCtrl.create({
       title: test,
       buttons: ['OK']
     })
     alert.present();
   }
  // takePicture(){
  //   this.camerapreview.takePicture(this.pictureOpts).then((imageData) => {
  //     this.picture = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

}
