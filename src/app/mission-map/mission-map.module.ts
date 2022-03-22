import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissionMapPageRoutingModule } from './mission-map-routing.module';

import { MissionMapPage } from './mission-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissionMapPageRoutingModule
  ],
  declarations: [MissionMapPage]
})
export class MissionMapPageModule {}
