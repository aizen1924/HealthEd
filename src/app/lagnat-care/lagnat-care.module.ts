import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LagnatCarePageRoutingModule } from './lagnat-care-routing.module';

import { LagnatCarePage } from './lagnat-care.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LagnatCarePageRoutingModule
  ],
  declarations: [LagnatCarePage]
})
export class LagnatCarePageModule {}
