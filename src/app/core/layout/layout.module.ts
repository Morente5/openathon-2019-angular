import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { LayoutComponent } from './layout.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
    LayoutComponent,
    ToolbarComponent,
  ],
  providers: [
  ],
  exports: [
    LayoutComponent,
    SharedModule,
  ]
})
export class LayoutModule { }
