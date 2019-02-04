import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChartsModule } from 'ng2-charts';
import { AuthServices } from '../providers/auth-services/auth-services';
import { HttpModule } from '@angular/http';
import { TempatUsahaPage } from '../pages/tempat-usaha/tempat-usaha';
import { RetribusiPage } from '../pages/retribusi/retribusi';
import { DigitalisasiPage } from '../pages/digitalisasi/digitalisasi';
import { PengaturanPage } from '../pages/pengaturan/pengaturan';
import { LoginPage } from '../pages/login/login';
import { UserloginPage } from '../pages/userlogin/userlogin';

@NgModule({
  declarations: [
    MyApp,
    UserloginPage,
    LoginPage,
    HomePage,
    PengaturanPage,
    TempatUsahaPage,
    RetribusiPage,
    DigitalisasiPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
    ChartsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserloginPage,
    LoginPage,
    HomePage,
    PengaturanPage,
    TempatUsahaPage,
    RetribusiPage,
    DigitalisasiPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServices
  ]
})
export class AppModule {}
