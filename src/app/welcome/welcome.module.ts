import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { WelcomePage } from './welcome.page';
import { RouterModule, Routes } from '@angular/router';
import { PopoverContentModule } from '../components/popover-content-page/popover-content.module';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PopoverContentModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule { }
