import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { UserMainPage } from './user/user-main.page';


const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', canActivate: [PublicGuard] ,loadChildren: './public/landing/landing.module#LandingPageModule' },
  { 
    path: 'user', 
    canActivate: [AuthGuard],
    component: UserMainPage,
    loadChildren: './user/user-routing.module#UserRoutingModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
