import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Friend } from '../models/friend';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  friends: Friend[] = []

  constructor(private db: DatabaseService, private router: Router) { 
  }

  ngOnInit() {
    // TODO: Fix This, gets called too many times, not efficient
    this.router.events.pipe().subscribe(() => {
      this.friends = this.db.getFriends()
  });
    
    
  }

}
