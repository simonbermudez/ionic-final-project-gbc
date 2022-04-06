import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFriendPageRoutingModule } from './add-friend-routing.module';

import { AddFriendPage } from './add-friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFriendPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddFriendPage]
})
export class AddFriendPageModule {}
