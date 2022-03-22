import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutMePage } from './about-me.page';

const routes: Routes = [
  {
    path: '',
    component: AboutMePage,
    children: [
      {
        path: 'about-us',
        loadChildren: () => import('../about-us/about-us.module').then(m => m.AboutUsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutMePageRoutingModule {}
