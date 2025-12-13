import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core'; // 1. Mag-add ng import na ito

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent {
  
  showFabButton = false;

  constructor(
    private router: Router, 
    private alertCtrl: AlertController,
    private cdr: ChangeDetectorRef // 2. I-inject dito
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // 3. Gamitin ang 'urlAfterRedirects' para mas accurate kaysa sa 'url' lang
        const currentUrl = event.urlAfterRedirects || event.url;
        
        // I-check kung ang URL ay naglalaman ng 'login', 'signup', o kaya ay nasa root ('/')
        const isHidden = 
          currentUrl.includes('login') || 
          currentUrl.includes('signup') || 
          currentUrl === '/'; // Kasama ang root path para sure na tago sa simula
        
        // Kung isHidden ay true, false ang showFabButton. Kung false ang isHidden, true ang button.
        this.showFabButton = !isHidden;

        // 4. Force update ang UI para sigurado
        this.cdr.detectChanges();
      }
    });
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Are you sure you want to exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Yes, Logout',
          handler: () => {
            localStorage.removeItem('currentUser');
            this.showFabButton = false; // I-hide agad pagka-logout
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }
}