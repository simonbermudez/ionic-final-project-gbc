import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Mission } from '../models/mission';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.page.html',
  styleUrls: ['./add-mission.page.scss'],
})
export class AddMissionPage implements OnInit {
  missionForm: FormGroup;

  constructor(private navController: NavController, 
              private actRoute: ActivatedRoute, 
              private db: DatabaseService,
              public formBuilder: FormBuilder,
              private router: Router
    ) { }

  async ngOnInit() {
    this.missionForm = this.formBuilder.group({
      name: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      tasks: ['', Validators.required],
      tags: ['', Validators.required]
    }) 
    await this.db.init()
  }

  goBack() {
    // TODO: navigate to friends tab page, do not use navigate back because it doesn't trigger ionViewWillEnter
    // this.router.navigate(['/']);
    console.log("going back");
    
    this.navController.back()
  }

  onSubmit() {
    this.db.addMission({
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
