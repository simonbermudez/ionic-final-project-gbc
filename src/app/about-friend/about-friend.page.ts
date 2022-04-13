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
  loading = true;

  constructor(private navController: NavController,
    private actRoute: ActivatedRoute,
    private db: DatabaseService,
    ) {
    db.getFriendById(actRoute.snapshot.params.id).then(friend => {
      this.friend = friend;
      this.loading = false;
    });
  }

  async ngOnInit() {
    await this.db.init();
  }

  call() {
    window.open(`tel:${this.friend.phone_number}`, '_system');
  }
  email(){
    window.open('mailto:' + this.friend.email);
  }

}
