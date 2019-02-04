import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServices } from '../../providers/auth-services/auth-services';

@IonicPage()
@Component({
  selector: 'page-digitalisasi',
  templateUrl: 'digitalisasi.html',
})
export class DigitalisasiPage {

  digitalisasi: string = "min";
  token;
  itemsmin;
  itemsmax;
  dgtPersen: any;
  dgtNama: any;
  available: boolean = true;

  public doughnutChartLabels:Array<any> = ['WSK', 'PBB', 'KOS', 'GGR', 'PSB', 'CIH', 'PAM'];
  public doughnutChartData:Array<any> = [1,2,3,4,5,6,7];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartLegend:boolean = true;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public authService: AuthServices) {

    const userData = JSON.parse(localStorage.getItem('userData'))
    this.token = userData.api_token;

    this.randomize();
  }

  public randomize() {

    this.dgtPersen = JSON.parse(localStorage.getItem('digitalisasi_persen'));
    this.dgtNama = JSON.parse(localStorage.getItem('digitalisasi_nama'));

    let dNama = JSON.parse(JSON.stringify(this.dgtNama));
    this.doughnutChartLabels = dNama;
    let dPersen = JSON.parse(JSON.stringify(this.dgtPersen));
    this.doughnutChartData = dPersen;
  }

  doRefresh(refresher){
    this.getDigitalisasiMin();
    refresher.complete();
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    })
    loading.present();
    this.randomize();
    this.getDigitalisasiMin();
    this.getDigitalisasiMax();
    loading.dismiss();
  }

  getDigitalisasiMax(){
    this.authService.getDigitalisasiMax(this.token).then((result) =>{
      this.itemsmax = result;
      if(this.itemsmax.length >= 1){
        localStorage.setItem('digitalisasimax_persen', 
        JSON.stringify([
          this.itemsmax[0]['persen'],
          this.itemsmax[1]['persen'],
          this.itemsmax[2]['persen'],
          this.itemsmax[3]['persen'],
          this.itemsmax[4]['persen']
        ]));
        localStorage.setItem('digitalisasimax_nama', 
        JSON.stringify([
          this.itemsmax[0]['nama'],
          this.itemsmax[1]['nama'],
          this.itemsmax[2]['nama'],
          this.itemsmax[3]['nama'],
          this.itemsmax[4]['nama']
        ]));
      }else{
        this.available = !this.available;
      }
    })
  }

  getDigitalisasiMin(){
    this.authService.getDigitalisasiMin(this.token).then((result) =>{
      this.itemsmin = result;
      
      localStorage.setItem('digitalisasi_persen', 
      JSON.stringify([
        this.itemsmin[0]['persen'],
        this.itemsmin[1]['persen'],
        this.itemsmin[2]['persen'],
        this.itemsmin[3]['persen'],
        this.itemsmin[4]['persen']
      ]));
      localStorage.setItem('digitalisasi_nama', 
      JSON.stringify([
        this.itemsmin[0]['nama'],
        this.itemsmin[1]['nama'],
        this.itemsmin[2]['nama'],
        this.itemsmin[3]['nama'],
        this.itemsmin[4]['nama']
      ]));
    })
  }
}
