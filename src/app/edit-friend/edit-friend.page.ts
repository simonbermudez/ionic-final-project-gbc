import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Friend } from '../models/friend';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-edit-friend',
  templateUrl: './edit-friend.page.html',
  styleUrls: ['./edit-friend.page.scss'],
})
export class EditFriendPage implements OnInit {
  
  friend: Friend;
  friendForm: FormGroup;

  constructor(private navController: NavController, 
              private actRoute: ActivatedRoute, 
              private db: DatabaseService,
              public formBuilder: FormBuilder) { 
    this.friend = db.getFriendById(actRoute.snapshot.params.id)
  }

  ngOnInit() {
    this.friendForm = this.formBuilder.group({
      id: this.friend.id,
      name: [this.friend.name, Validators.required],
      email: [this.friend.email, [Validators.required, Validators.email]],
      phone_number: [this.friend.phone_number, Validators.required],
      level: this.friend.level
    })
  }

  goBack() {
    this.navController.back();
  }

  deleteFriend(id: number) {
    this.db.deleteFriendById(id);
    this.goBack()
  }

  onSubmit() {
    this.db.updateFriend({...this.friendForm.value, achievements: this.friend.achievements})
    this.goBack()
  } 

}
