import { Injectable } from '@angular/core';
import friends from '../data/friends';
import missions from '../data/missions';
import user from '../data/user';
import { Friend } from '../models/friend';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private _storage: Storage | null = null;

  constructor(public storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getFriends() {
    let friendsStorage = await this._storage?.get('friends');
    if(!friendsStorage) {
      await this._storage?.set('friends', JSON.stringify(friends))
      return friends
    }
    return JSON.parse(friendsStorage)
  }

  async getFriendById(id: number) {
    const friends = await this.getFriends();
    return friends.find(f => f.id == id)
  }

  async updateFriend(friend: Friend) {
    let friendsStorage = await this.getFriends();
    friendsStorage[friendsStorage.findIndex(f => f.id === friend.id)] = friend;
    await this._storage?.set('friends', JSON.stringify(friendsStorage));
  }

  async deleteFriendById(id: number) {
    let friendsStorage = await this.getFriends();
    friendsStorage.splice(friendsStorage.findIndex(f => f.id === id), 1);
    await this._storage?.set('friends', JSON.stringify(friendsStorage));
  }

  async addFriend(friend: Friend) {
    let friendsStorage = await this.getFriends();
    friend = {id: friendsStorage.at(-1).id + 1, ...friend, achievements: []}
    friendsStorage.push(friend);
    await this._storage?.set('friends', JSON.stringify(friendsStorage));
  }

  async getUser() {
    let userStorage = await this._storage?.get('user');
    if(!userStorage) {
      await this._storage?.set('user', JSON.stringify(user))
      return user
    }
    return JSON.parse(userStorage)
  }

  async getMissions() {
    let missionsStorage = await this._storage?.get('missions');
    if(!missionsStorage) {
      await this._storage?.set('missions', JSON.stringify(missions))
      return missions
    }
    return JSON.parse(missionsStorage)
  }

  async getMissionById(id: number) {
    const missions = await this.getMissions()
    return missions.find(m => m.id == id)
  }


}
