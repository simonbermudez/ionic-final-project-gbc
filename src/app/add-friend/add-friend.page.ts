import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
              public formBuilder: FormBuilder,
              private router: Router) { 
  }

  async ngOnInit() {
    this.friendForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      level: 1
    })
    await this.db.init()
  }

  goBack() {
    // TODO: navigate to friends tab page, do not use navigate back because it doesn't trigger ionViewWillEnter
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.db.addFriend(this.friendForm.value as Friend)
    this.goBack()
  } 

}
