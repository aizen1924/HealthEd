import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtiTipsPage } from './uti-tips.page';

const routes: Routes = [
  {
    path: '',
    component: UtiTipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtiTipsPageRoutingModule {}
