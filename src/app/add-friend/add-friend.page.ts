import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Friend } from '../models/friend';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage implements OnInit {
  friendForm: FormGroup;

  constructor(private navController: NavController, 
              private actRoute: ActivatedRoute, 
              private db: DatabaseService,
              public formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.friendForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      level: 1
    })
  }

  goBack() {
    this.navController.back();
  }

  onSubmit() {
    this.db.addFriend(this.friendForm.value)
    this.goBack()
  } 

}
