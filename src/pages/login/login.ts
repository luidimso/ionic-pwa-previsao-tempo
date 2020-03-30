import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  url:string = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=pt&appid=33c7aa3f2aef038c05d28c3fb0668a73&q="

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: Toast, public http: Http, public alertCtrl: AlertController, public loadingController: LoadingController) {
  }

  verificar(cidade:string){
    let loading = this.loadingController.create({ content: "Verificando" });
    loading.present();

    this.http.get(this.url+encodeURI(cidade)).map(res => res.json()).subscribe(data => {
      loading.dismiss();
      this.navCtrl.push("HomePage", {cidade: cidade})
    }, err => {
      loading.dismiss();

      if(err.status === 404){
        let alert = this.alertCtrl.create({
          title: 'Cidade não encontrada',
          subTitle: 'Verifique e tente novamente',
          buttons: ['OK']
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Erro de conexão',
          subTitle: 'Verifique a conexão com a internet',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }
}
