import { Component, OnInit } from '@angular/core';
import { Friend } from '../models/friend';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.page.html',
  styleUrls: ['./about-me.page.scss'],
})
export class AboutMePage implements OnInit {
  user: Friend;
  
  constructor(private db: DatabaseService) { 
    this.user = db.getUser()
  }

  ngOnInit() {
  }

}
