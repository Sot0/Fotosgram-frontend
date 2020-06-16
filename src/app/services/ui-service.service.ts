import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async alertaInformativa( message: string ) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async toastInformativo( message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top'
    });

    await toast.present();
  }

}
