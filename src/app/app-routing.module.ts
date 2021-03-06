import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./friends/friends.module').then( m => m.FriendsPageModule)
  },
  {
    path: 'about-me',
    loadChildren: () => import('./about-me/about-me.module').then( m => m.AboutMePageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'missions',
    loadChildren: () => import('./missions/missions.module').then( m => m.MissionsPageModule)
  },
  {
    path: 'mission',
    loadChildren: () => import('./mission/mission.module').then( m => m.MissionPageModule)
  },
  {
    path: 'mission-map',
    loadChildren: () => import('./mission-map/mission-map.module').then( m => m.MissionMapPageModule)
  },
  {
    path: 'add-mission',
    loadChildren: () => import('./add-mission/add-mission.module').then( m => m.AddMissionPageModule)
  },
  {
    path: 'about-friend',
    loadChildren: () => import('./about-friend/about-friend.module').then( m => m.AboutFriendPageModule)
  },
  {
    path: 'edit-friend',
    loadChildren: () => import('./edit-friend/edit-friend.module').then( m => m.EditFriendPageModule)
  },
  {
    path: 'add-friend',
    loadChildren: () => import('./add-friend/add-friend.module').then( m => m.AddFriendPageModule)
  },
  {
    path: 'edit-mission',
    loadChildren: () => import('./edit-mission/edit-mission.module').then( m => m.EditMissionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
