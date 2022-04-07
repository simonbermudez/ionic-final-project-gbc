import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMissionPage } from './edit-mission.page';

const routes: Routes = [
  {
    path: ':id',
    component: EditMissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMissionPageRoutingModule {}
