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
    this.mission = db.getMissionById(actRoute.snapshot.params.id)
  }

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }

}
