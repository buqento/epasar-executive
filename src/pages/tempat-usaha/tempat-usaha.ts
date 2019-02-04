import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServices } from '../../providers/auth-services/auth-services';

@IonicPage()
@Component({
  selector: 'page-tempat-usaha',
  templateUrl: 'tempat-usaha.html',
})
export class TempatUsahaPage {
  
  tempatUsaha: string = "terisi";
  items;
  itemskosong;
  token;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public authService: AuthServices) {
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.token = userData.api_token;
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    })
    loading.present();
    this.getTempatUsaha();
    this.getTempatUsahasKosong();
    loading.dismiss();
  }

  getTempatUsaha(){
    this.authService.getTempatUsaha(this.token).then((result)=>{
      this.items = result;
    })
  }

  getTempatUsahasKosong(){
    this.authService.getTempatUsahaKosong(this.token).then((result)=>{
      this.itemskosong = result;
    })
  }
}
