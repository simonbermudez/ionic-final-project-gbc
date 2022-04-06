import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFriendPageRoutingModule } from './edit-friend-routing.module';

import { EditFriendPage } from './edit-friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditFriendPageRoutingModule
  ],
  declarations: [EditFriendPage]
})
export class EditFriendPageModule {}
