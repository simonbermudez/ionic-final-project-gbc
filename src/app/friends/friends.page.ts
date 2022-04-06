import { Component, OnInit } from '@angular/core';
import { Friend } from '../models/friend';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  friends: Friend[] = []

  constructor(private db: DatabaseService) { 
    this.friends = this.db.getFriends()
  }

  ngOnInit() {
    
  }

}
