import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentalHealthPageRoutingModule } from './mental-health-routing.module';

import { MentalHealthPage } from './mental-health.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentalHealthPageRoutingModule
  ],
  declarations: [MentalHealthPage]
})
export class MentalHealthPageModule {}
