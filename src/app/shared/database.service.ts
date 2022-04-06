import { Injectable } from '@angular/core';
import friends from '../data/friends';
import missions from '../data/missions';
import user from '../data/user';

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

  getFriendById(id: number) {
    return this.getFriends().find(f => f.id == id)
  }

  getUser() {
    let userStorage = localStorage.getItem('user');
    if(!userStorage) {
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
    return JSON.parse(userStorage)
  }

  getMissions() {
    let missionsStorage = localStorage.getItem('missions');
    if(!missionsStorage) {
      localStorage.setItem('missions', JSON.stringify(missions))
      return missions
    }
    return JSON.parse(missionsStorage)
  }

  getMissionById(id: number) {
    return this.getMissions().find(m => m.id == id)
  }


}
