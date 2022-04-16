import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'missions',
        loadChildren: () => import('../missions/missions.module').then(m => m.MissionsPageModule)
      },
      {
        path: 'friends',
        loadChildren: () => import('../friends/friends.module').then(m => m.FriendsPageModule)
      },
      {
        path: 'about-me',
        loadChildren: () => import('../about-me/about-me.module').then(m => m.AboutMePageModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('../about-me/about-me.module').then(m => m.AboutMePageModule)
      },
      {
        path: 'mission-map',
        loadChildren: () => import('../mission-map/mission-map.module').then(m => m.MissionMapPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/missions',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/missions',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
