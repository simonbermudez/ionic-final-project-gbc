import { Injectable } from '@angular/core';
import friends from '../data/friends';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {


  }

  getFriends() {
    let friendsStorage = localStorage.getItem('friends');
    if(!friendsStorage) {
      localStorage.setItem('friends', JSON.stringify(friends))
      return friends
    }
    return JSON.parse(friendsStorage)
  }
}
