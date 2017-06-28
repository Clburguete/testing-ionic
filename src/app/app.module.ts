import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CameraPrevPage } from '../pages/camera-prev/camera-prev';
import { ShareProvider } from '../providers/share/share';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CameraPrevPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CameraPrevPage

  ],
  providers: [
    Camera,
    CameraPreview,
    LocalNotifications,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShareProvider
  ]
})
export class AppModule {}
