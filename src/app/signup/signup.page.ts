import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import FireAuth
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import Firestore

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
    standalone: false
})
export class SignupPage {

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private router: Router, 
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth, // Inject Auth
    private firestore: AngularFirestore // Inject DB
  ) { }

  togglePassword() { this.showPassword = !this.showPassword; }
  toggleConfirmPassword() { this.showConfirmPassword = !this.showConfirmPassword; }

  checkStrength(password: string): boolean {
    const hasNumber = /\d/.test(password);
    return password.length >= 6 && hasNumber;
  }

  async signup() {
    // 1. Basic Validation
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.presentToast('Please fill in all fields', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentToast('Passwords do not match', 'danger');
      return;
    }

    if (!this.checkStrength(this.password)) {
      this.presentToast('Password weak. Use 6+ chars & 1 number.', 'warning');
      return;
    }

    // 2. Firebase Registration
    try {
      // Create user in Firebase Authentication
      const result = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      
      if (result.user) {
        // Save the "Full Name" and extra details to Firestore Database
        await this.firestore.collection('users').doc(result.user.uid).set({
          fullName: this.fullName,
          email: this.email,
          createdAt: new Date().toISOString(),
          role: 'student' // Optional: helpful for future features
        });

        this.presentToast('Account created successfully!', 'success');
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      // Handle Firebase Errors (e.g., Email already in use)
      let msg = 'Registration failed';
      if (error.code === 'auth/email-already-in-use') {
        msg = 'Email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'Invalid email format.';
      }
      this.presentToast(msg, 'danger');
      console.error(error);
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message, duration: 2000, color: color, position: 'top'
    });
    toast.present();
  }
}