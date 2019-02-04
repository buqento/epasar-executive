import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServices } from '../../providers/auth-services/auth-services';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-userlogin',
  templateUrl: 'userlogin.html',
})

export class UserloginPage {
  PushSignup: any;
  responseData : any;
  userDetails: any;
  uLat: any;
  uLng: any;
  address: any;
  userData = {"username": "admin","password": "admin"};
  userPostData = {"id_user":""};
  dataSet: any;
  categoryData = {};
  password_type: string = 'password';
  splash = true;

  constructor(public navCtrl: NavController, 
    public authService: AuthServices,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
      
  }

  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.splash = false;
    }, 4000);
    let userLogin = localStorage.getItem("userData");
		if(userLogin){
      this.navCtrl.setRoot(HomePage);
    }
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  getRandom(length){
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
  }

  logIn(){
    if(this.userData.username && this.userData.password){
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        showBackdrop: true
      })
      loading.present();
      setTimeout(() => { loading.dismiss(); }, 5000);
      
      this.authService.postData(this.userData,'login').then((result) => {
      this.responseData = result; 
      if(this.responseData.userData){
        localStorage.setItem('userData', JSON.stringify(this.responseData));        
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }else{
        loading.dismiss();
        this.presentToast(this.responseData.message.text);
      }
    }, (err) => {
   });

  }else{
    this.presentToast("Inputan data tidak valid!");
  }}

}