import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissionMapPage } from './mission-map.page';

const routes: Routes = [
  {
    path: '',
    component: MissionMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionMapPageRoutingModule {}
