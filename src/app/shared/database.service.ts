import { Injectable } from '@angular/core';
import friends from '../data/friends';
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

  getFriendsById(id: number) {
    let friends = JSON.parse(localStorage.getItem('friends'));
    return friends.find(f => f.id == id)
  }

  getUser() {
    let userStorage = localStorage.getItem('user');
    if(!userStorage) {
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
    return JSON.parse(userStorage)
  }

}
