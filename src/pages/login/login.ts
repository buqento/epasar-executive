import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthServices } from '../../providers/auth-services/auth-services';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userData = {"email":"buqento@gmail.com", "password":"admin123"};
  responseData;
  splash = true;
  password_type: string = 'password';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authServices: AuthServices,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false;
    }, 4000);
    let userLogin = localStorage.getItem("userData");
		if(userLogin){
      this.navCtrl.setRoot(HomePage);
    }
  }

  logIn(){
    if(this.userData.email && this.userData.password){
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        showBackdrop: true
      })
      loading.present();
      setTimeout(() => { loading.dismiss(); }, 5000);
      this.authServices.postData(this.userData,'login').then((result) => {
      this.responseData = result;
      if(this.responseData.success == true){
        localStorage.setItem('userData', JSON.stringify(this.responseData.message));
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }else{
        loading.dismiss();
        this.presentToast(this.responseData.message);
      }
    }, (err) => {
   });

  }else{
    this.presentToast("Inputan data tidak valid!");
  }}

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }

}
