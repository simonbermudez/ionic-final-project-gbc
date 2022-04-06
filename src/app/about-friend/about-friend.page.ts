import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Friend } from '../models/friend';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-about-friend',
  templateUrl: './about-friend.page.html',
  styleUrls: ['./about-friend.page.scss'],
})
export class AboutFriendPage implements OnInit {
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
