import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
      { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
      { path: 'plants', loadChildren: './plants/plants.module#PlantsPageModule' },
      { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }



