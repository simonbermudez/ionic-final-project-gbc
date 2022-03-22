import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMissionPageRoutingModule } from './add-mission-routing.module';

import { AddMissionPage } from './add-mission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMissionPageRoutingModule
  ],
  declarations: [AddMissionPage]
})
export class AddMissionPageModule {}
