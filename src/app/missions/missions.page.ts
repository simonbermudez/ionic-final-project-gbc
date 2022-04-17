import { Component, Input, OnInit } from '@angular/core';
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
  searchedMissions: Mission[];
  search: string = "";

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
    this.searchedMissions = missions
  }

  share(mission) {
    alert(mission.name)
  }

  searchMissions() {
    if(this.search) {
      this.searchedMissions = this.missions.filter(m => m.name.toLowerCase().includes(this.search.toLowerCase()) || m.tags.join(", ").toLowerCase().includes(this.search.toLowerCase()) )
    } else {
      this.searchedMissions = this.missions;
    }
  }
}
