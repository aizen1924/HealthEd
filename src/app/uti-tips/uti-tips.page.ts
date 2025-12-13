import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-uti-tips',
    templateUrl: './uti-tips.page.html',
    styleUrls: ['./uti-tips.page.scss'],
    standalone: false
})
export class UtiTipsPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async openClinicInfo() {
    const alert = await this.alertController.create({
      header: 'School Clinic',
      subHeader: 'Nurse Office',
      message: 'The clinic is open from 8:00 AM to 5:00 PM. Please proceed to the School Clinic. Bring your ID.',
      buttons: ['OK']
    });

    await alert.present();
  }

}