import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtiTipsPageRoutingModule } from './uti-tips-routing.module';

import { UtiTipsPage } from './uti-tips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtiTipsPageRoutingModule
  ],
  declarations: [UtiTipsPage]
})
export class UtiTipsPageModule {}
