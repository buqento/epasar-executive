import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServices } from '../../providers/auth-services/auth-services';
import { TempatUsahaPage } from '../tempat-usaha/tempat-usaha';
import { RetribusiPage } from '../retribusi/retribusi';
import { DigitalisasiPage } from '../digitalisasi/digitalisasi';
import { PengaturanPage } from '../pengaturan/pengaturan';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  navPengaturan:any = PengaturanPage;

  public doughnutChartLabels: string[] = ['Wastukencana', 'Gegerkalong', 'Kosambi'];
  public doughnutChartData: number[] = [35, 74, 300];
  public doughnutChartType: string = 'doughnut';

  constructor(public navCtrl: NavController, public authService: AuthServices) {}

  tab1root = DigitalisasiPage;
  tab2root = TempatUsahaPage;
  tab3root = RetribusiPage;

}