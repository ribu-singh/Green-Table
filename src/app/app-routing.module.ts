import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.loginPageModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-photo/upload-photo.module').then(m => m.PicturePageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.accountPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  // {
  //   path: 'crop',
  //   loadChildren: () => import('./crop/crop.module').then(m => m.CropPageModule)
  // },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
