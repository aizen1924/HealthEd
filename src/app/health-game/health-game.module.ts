import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// CRITICAL IMPORT: IonicModule
import { IonicModule } from '@ionic/angular';

import { HealthGamePageRoutingModule } from './health-game-routing.module';

import { HealthGamePage } from './health-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // This MUST be here to fix the "not a known element" errors
    HealthGamePageRoutingModule
  ],
  declarations: [HealthGamePage]
})
export class HealthGamePageModule {}