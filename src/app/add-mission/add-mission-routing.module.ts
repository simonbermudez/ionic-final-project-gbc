import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMissionPage } from './add-mission.page';

const routes: Routes = [
  {
    path: '',
    component: AddMissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMissionPageRoutingModule {}
