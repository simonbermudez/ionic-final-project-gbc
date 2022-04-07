import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Mission } from '../models/mission';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.page.html',
  styleUrls: ['./mission.page.scss'],
})
export class MissionPage implements OnInit {
  mission: Mission

  constructor(private navController: NavController, 
              private actRoute: ActivatedRoute, 
              private db: DatabaseService) { 
    db.getMissionById(actRoute.snapshot.params.id).then(mission => this.mission = mission) 
  }

  async ngOnInit() {
    await this.db.init()
  }

  goBack() {
    this.navController.back();
  }

  deleteMission(id: number) {
    this.db.deleteMissionById(id);
    this.goBack()
  }

}
