import { Component, OnInit } from '@angular/core';
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

  constructor(private navController: NavController, private actRoute: ActivatedRoute, private db: DatabaseService) { 
    this.friend = db.getFriendById(actRoute.snapshot.params.id)
  }

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }

}
