import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  // --- START YOUR ROUTES WITH LOGIN/SIGNUP ---
  
  // ADD a default root path that redirects to login if no path is given
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    // Public Page (No Guard)
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    // Public Page (No Guard)
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },

  // --- PROTECTED ROUTES (Require Login) ---
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'health-game',
    loadChildren: () => import('./health-game/health-game.module').then( m => m.HealthGamePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'book-details/:id',
    loadChildren: () => import('./book-details/book-details.module').then( m => m.BookDetailsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'uti-tips',
    loadChildren: () => import('./uti-tips/uti-tips.module').then( m => m.UtiTipsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'lagnat-care',
    loadChildren: () => import('./lagnat-care/lagnat-care.module').then( m => m.LagnatCarePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'fight-malnutrition',
    loadChildren: () => import('./fight-malnutrition/fight-malnutrition.module').then( m => m.FightMalnutritionPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'first-aid',
    loadChildren: () => import('./first-aid/first-aid.module').then( m => m.FirstAidPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'mental-health',
    loadChildren: () => import('./mental-health/mental-health.module').then( m => m.MentalHealthPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule),
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}