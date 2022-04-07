import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMissionPageRoutingModule } from './edit-mission-routing.module';

import { EditMissionPage } from './edit-mission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMissionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditMissionPage]
})
export class EditMissionPageModule {}
