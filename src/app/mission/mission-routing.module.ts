import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissionPage } from './mission.page';

const routes: Routes = [
  {
    path: ':id',
    component: MissionPage,
    children: [
      {
        path: 'mission-map',
        loadChildren: () => import('../mission-map/mission-map.module').then(m => m.MissionMapPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionPageRoutingModule {}
