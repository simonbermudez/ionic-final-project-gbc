import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutFriendPage } from './about-friend.page';

const routes: Routes = [
  {
    path: ':id',
    component: AboutFriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutFriendPageRoutingModule {}
