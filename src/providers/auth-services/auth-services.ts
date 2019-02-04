import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let api = 'http://rinjani.id/api/epasar_eksekutif/';

@Injectable()
export class AuthServices {

  constructor(public http: Http) {}

  postData(credentials, type){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(api + type, JSON.stringify(credentials), {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }

  //tempat usaha terisi
  getTempatUsaha(token) {
    return new Promise(resolve => {
      this.http.get(api+'tempatusaha'+'?api_token='+token).subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }

  //tempat usaha kosong
  getTempatUsahaKosong(token) {
    return new Promise(resolve => {
      this.http.get(api+'tempatusahakosong'+'?api_token='+token).subscribe(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
  }

  //retribusi belum bayar
  getRetribusiBelumBayar(ftanggal, ttanggal, token){
    return new Promise(resolve =>{
      this.http.get(api+'retribusibelumbayar/'+ftanggal+'/'+ttanggal+'?api_token='+token).subscribe(data =>{
        resolve(data.json());
      })
    })
  }

  //retribusi sudah bayar
  getRetribusiSudahBayar(ftanggal, ttanggal, token){
    return new Promise(resolve =>{
      this.http.get(api+'retribusisudahbayar/'+ftanggal+'/'+ttanggal+'?api_token='+token).subscribe(data =>{
        resolve(data.json());
      })
    })
  }

  //digitalisasi data diatas 90%
  getDigitalisasiMax(token){
    return new Promise(resolve =>{
      this.http.get(api+'digitalisasimax'+'?api_token='+token).subscribe(data =>{
        resolve(data.json());
      })
    })
  }

  //digitalisasi data dibawah 90%
  getDigitalisasiMin(token){
    return new Promise(resolve =>{
      this.http.get(api+'digitalisasimin'+'?api_token='+token).subscribe(data =>{
        resolve(data.json());
      })
    })
  }

}
