import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NativeBiometric } from 'capacitor-native-biometric';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import FireAuth

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: false
})
export class LoginPage implements OnInit {

  email = '';
  password = '';
  showPassword = false;
  isBiometricAvailable = false;

  constructor(
    private router: Router, 
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth // Inject Auth
  ) {}

  async ngOnInit() {
    const result = await NativeBiometric.isAvailable();
    this.isBiometricAvailable = result.isAvailable;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async forgotPassword() {
    if(!this.email) {
        this.presentToast('Please enter your email first.', 'warning');
        return;
    }
    // Firebase Password Reset Logic
    try {
        await this.afAuth.sendPasswordResetEmail(this.email);
        this.presentToast('Reset link sent to your email!', 'success');
    } catch(err) {
        this.presentToast('Error sending reset link.', 'danger');
    }
  }

  async performBiometricLogin() {
    // Note: To make this secure, you usually need to store a token securely.
    // For now, we will keep your existing flow but verify availability.
    try {
      await NativeBiometric.verifyIdentity({
        reason: "For easy log in",
        title: "Log in",
        subtitle: "Authenticate",
        description: "Please use your fingerprint to continue",
      });
      // If successful:
      this.presentToast('Biometric Authentication Successful!', 'success');
      this.router.navigate(['/tabs/tab2'], { replaceUrl: true });
    } catch (error) {
      console.error("Biometric failed", error);
    }
  }

  async login() {
    if (!this.email || !this.password) {
      this.presentToast('Please enter both email and password.', 'warning');
      return; 
    }

    try {
      // Firebase Sign In
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      
      this.presentToast('Login Successful!', 'success');
      this.router.navigate(['/tabs/tab2'], { replaceUrl: true });

    } catch (error: any) {
      let msg = 'Login Failed';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        msg = 'Invalid Email or Password.';
      }
      this.presentToast(msg, 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message, duration: 2000, color: color, position: 'top'
    });
    toast.present();
  }
}