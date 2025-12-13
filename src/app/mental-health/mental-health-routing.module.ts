import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentalHealthPage } from './mental-health.page';

const routes: Routes = [
  {
    path: '',
    component: MentalHealthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentalHealthPageRoutingModule {}
