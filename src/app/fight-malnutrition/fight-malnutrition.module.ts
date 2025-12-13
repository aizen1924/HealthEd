import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FightMalnutritionPageRoutingModule } from './fight-malnutrition-routing.module';

import { FightMalnutritionPage } from './fight-malnutrition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FightMalnutritionPageRoutingModule
  ],
  declarations: [FightMalnutritionPage]
})
export class FightMalnutritionPageModule {}
