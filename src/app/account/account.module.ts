import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';



const routes: Routes = [
  {
    path: '',
    component: AccountComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowserModule,
    RouterModule.forChild(routes)
  ],
  exports: [AccountComponent],

  declarations: [AccountComponent]
})
export class accountPageModule { }
