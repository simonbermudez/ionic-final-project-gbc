import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { Friend } from '../models/friend';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit, ViewWillEnter {

  friends: Friend[] = []

  constructor(private db: DatabaseService, private router: Router) { 
  }

  async ngOnInit() {
    // TODO: Fix This, gets called too many times, not efficient
    await this.db.init()
  }

  async ionViewWillEnter() {
    const friends = await this.db.getFriends()
    this.friends = friends
  }

}
