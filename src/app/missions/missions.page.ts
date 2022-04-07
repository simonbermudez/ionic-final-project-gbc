import { Component, OnInit } from '@angular/core';
import { Mission } from '../models/mission';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {
  missions: Mission[];

  constructor(private db: DatabaseService) { }

  async ngOnInit() {
    this.db.init()
  }

  async ionViewWillEnter() {
    const missions = await this.db.getMissions()
    this.missions = missions
  }
  

  share(mission) {
    alert(mission.name)
  }
}
