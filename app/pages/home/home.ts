import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import {Platform} from 'ionic-angular';
import { BatteryStatus } from 'ionic-native';
import { Observable }     from 'rxjs/Observable';

import { Flashlight } from 'ionic-native';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,
  private alertController: AlertController,
  private platform: Platform
) {

  }
  showPrompt() {
    let prompt = this.alertController.create({
      title: 'Tecnual',
      message: `Desarrollamos apps para smartphones y tablets:
      iOS de Apple (iPhone, iPod, iPad), Android de Google, Windows Phone.
      <br>
      Síguenos en twitter <a href="https://twitter.com/Tecnual">@Tecnual</a>
      </p>`,

      buttons: [
        {
          text: 'ok',
        }
      ]
    });
    prompt.present();
  }

bc_color = "bc_apagado";
frase = "Hola";
batteryLevel = " ";
batteryStatus = "battery-full";

// watch change in battery status
subscription = BatteryStatus.onChange().subscribe(
 (status: any) => {
   if (status.isPlugged) this.batteryStatus = "battery-charging"
   else this.batteryStatus = "battery-full";

   this.batteryLevel = status.level + "";
   //console.log(status.level, status.isPlugged);
 }
);

salir(){
  let prompt = this.alertController.create({
    title: '¡Hasta pronto!',

    buttons: [
      {
        text: 'bye!',
        handler: action => {
          Flashlight.switchOff();
          this.subscription.unsubscribe();
          this.platform.exitApp();
       }
      }
    ]
  });
  prompt.present();
}
cambio(){
  if (Flashlight.available()){

    if (this.bc_color === "bc_apagado") {
      Flashlight.switchOn();
      this.bc_color = "bc_encendido";
      this.frase = "Encendido";
    }
    else
    {
      Flashlight.switchOff();
      this.bc_color = "bc_apagado";
      this.frase = "Apagado";
    }
  }
}


}
