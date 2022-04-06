import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFriendPage } from './edit-friend.page';

const routes: Routes = [
  {
    path: ':id',
    component: EditFriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFriendPageRoutingModule {}
