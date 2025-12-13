import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LagnatCarePage } from './lagnat-care.page';

const routes: Routes = [
  {
    path: '',
    component: LagnatCarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LagnatCarePageRoutingModule {}
