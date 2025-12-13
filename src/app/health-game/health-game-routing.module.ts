import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthGamePage } from './health-game.page'; // Ensure this matches

const routes: Routes = [
  {
    path: '',
    component: HealthGamePage // Ensure this matches
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthGamePageRoutingModule {}