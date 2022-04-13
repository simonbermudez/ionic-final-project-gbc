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
  mission: Mission;
  loading = true;

  constructor(private navController: NavController,
              private actRoute: ActivatedRoute,
              private db: DatabaseService) {
  }

  async ngOnInit() {
    await this.db.init();
  }

  async ionViewWillEnter() {
    let mission = await this.db.getMissionById(this.actRoute.snapshot.params.id);
    this.mission = mission;
    this.loading = false;
  }

  goBack() {
    this.navController.back();
  }

  deleteMission(id: number) {
    this.db.deleteMissionById(id);
    this.goBack();
  }

}
