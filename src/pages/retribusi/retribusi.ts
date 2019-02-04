import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServices } from '../../providers/auth-services/auth-services';

@IonicPage()
@Component({
  selector: 'page-retribusi',
  templateUrl: 'retribusi.html',
})
export class RetribusiPage {
  
  token;
  retribusi: string = "sudah";
  itemssudahbayar;
  itemsbelumbayar;
  fTanggal;
  tTanggal;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public authService: AuthServices) {
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.token = userData.api_token;

      let myDate = new Date();
      myDate.setDate(myDate.getDate() - 30);
      this.fTanggal = myDate.toISOString().slice(0, 10);
      this.tTanggal = new Date().toISOString().slice(0, 10);
  }

  ionViewDidLoad() {
    this.setTanggal();
  }

  setTanggal(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    })
    loading.present();

    var fdate = new Date(this.fTanggal);
    var tdate = new Date(this.tTanggal);
    var fseconds = fdate.getTime() / 1000;
    var tseconds = tdate.getTime() / 1000;
    this.getRetribusiBelumBayar(fseconds, tseconds);
    this.getRetribusiSudahBayar(fseconds, tseconds);
    loading.dismiss();
  }

  getRetribusiBelumBayar(ftanggal, ttanggal){
    this.authService.getRetribusiBelumBayar(ftanggal, ttanggal, this.token).then((result) =>{
      this.itemsbelumbayar = result;
    })
  }

  getRetribusiSudahBayar(ftanggal, ttanggal){
    this.authService.getRetribusiSudahBayar(ftanggal, ttanggal, this.token).then((result) =>{
      this.itemssudahbayar = result;
    })
  }
}
