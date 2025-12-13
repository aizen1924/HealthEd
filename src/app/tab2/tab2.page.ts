import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: false
})
export class Tab2Page {

  userName: string = 'Student'; 

  constructor(private router: Router) {}

  ionViewWillEnter() {
    // 1. Get the user object from storage
    const userString = localStorage.getItem('currentUser');
    
    if (userString) {
      // 2. Parse it back to an object
      const user = JSON.parse(userString);
      // 3. Set the name
      this.userName = user.name; 
    }
  }

  openHealthGame() {
    this.router.navigate(['/health-game']);
  }
}