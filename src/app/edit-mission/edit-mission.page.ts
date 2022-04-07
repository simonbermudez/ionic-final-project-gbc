import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Mission } from '../models/mission';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-edit-mission',
  templateUrl: './edit-mission.page.html',
  styleUrls: ['./edit-mission.page.scss'],
})
export class EditMissionPage implements OnInit {

  mission: Mission;
  missionForm: FormGroup;

  constructor(private navController: NavController, 
    private actRoute: ActivatedRoute, 
    private db: DatabaseService,
    public formBuilder: FormBuilder,
    private router: Router) { 
      db.getMissionById(actRoute.snapshot.params.id).then(mission => {
        this.mission = mission
        this.missionForm = this.formBuilder.group({
          name: [this.mission.name, Validators.required],
          latitude: [this.mission.location.latitude, Validators.required],
          longitude: [this.mission.location.longitude, Validators.required],
          tasks: [this.mission.tasks, Validators.required],
          tags: [this.mission.tags.join(', '), Validators.required]
        })
      })

    }

  goBack() {
    // TODO: navigate to friends tab page, do not use navigate back because it doesn't trigger ionViewWillEnter
    // this.router.navigate(['/']);
    this.navController.back()
  }

  async ngOnInit() {
    await this.db.init()
  }

  onSubmit() {
    this.db.updateMission({
      id: this.mission.id,
      name: this.missionForm.value.name, 
      location: {
        latitude: this.missionForm.value.latitude,
        longitude: this.missionForm.value.longitude,
      },
      tasks: this.missionForm.value.tasks,
      tags: this.missionForm.value.tags.split(", ")
    } as Mission)
    this.goBack()
  }

}
