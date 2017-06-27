import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera } from '@ionic-native/camera';
import * as firebase from 'firebase'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  pictureTaken: boolean = false;
  image: string = null;


  constructor(private loadingCtrl: LoadingController, private camera: Camera, public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController, public localnotifications: LocalNotifications) {

    platform.ready().then(() => {
      this.localnotifications.hasPermission().then(function(granted) {
        if (!granted) {
          this.localnotifications.registerPermission();
        }
      })

    })
  }
  ionViewdidLoad() {
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
  getPicture() {
    let options = {
      quality: 80,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.presentLoadingDefault();

      this.pictureTaken = true;
      this.image = "data:image/jpeg;base64," + imageData;
      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.image);
    }, (err) => {
      console.log(err);
    });
    this.addNotifications()

  }

  upload(){
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    imageRef.putString(this.image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
    });
  }
  addNotifications() {
    let notification = {
      id: 1,
      title: "hey!",
      text: "testing notifications",
      at: new Date(new Date().getTime() + 1 * 60 * 1000)
    }
    this.localnotifications.schedule(notification)
  }
}
