import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  paletteToggle = false;

  constructor() {
    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
    this.initializeDarkMode();
  }

  initializeDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.toggleDarkPalette(mediaQuery.matches));
  }

  toggleDarkPalette(isDark: boolean): void {
    this.paletteToggle = isDark;
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
  }
}
