import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserloginPage } from '../userlogin/userlogin';

@IonicPage()
@Component({
  selector: 'page-pengaturan',
  templateUrl: 'pengaturan.html',
})
export class PengaturanPage {

  username;
  email;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const userData = JSON.parse(localStorage.getItem('userData'))
    this.username = userData.userData.username;
    this.email = userData.userData.email;
  }

  logOut(){
    localStorage.clear();
    this.navCtrl.setRoot(UserloginPage);
  }

}
