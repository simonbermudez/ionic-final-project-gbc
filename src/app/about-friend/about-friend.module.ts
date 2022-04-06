import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutFriendPageRoutingModule } from './about-friend-routing.module';

import { AboutFriendPage } from './about-friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutFriendPageRoutingModule
  ],
  declarations: [AboutFriendPage]
})
export class AboutFriendPageModule {}
