import { Component, OnInit } from '@angular/core';
import { Mission } from '../models/mission';
import { DatabaseService } from '../shared/database.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

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
    await this.loadMissions()
  }
  
  async loadMissions() {
    const missions = await this.db.getMissions()
    this.missions = missions
  }

  share(mission) {
    alert(mission.name)
  }
}
