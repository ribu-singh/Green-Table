import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopoverContentPageComponent } from './popover-content-page.component';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    PopoverContentPageComponent,
    ],
    exports: [
      PopoverContentPageComponent
    ]
})
export class PopoverContentModule { }
