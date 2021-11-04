import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LisPostsRoutingModule } from './lis-posts-routing.module';
import { LisPostsComponent } from './lis-posts.component';
import { MaterialModule } from 'src/app/material.module';
import { TableComponent } from 'src/app/shared/components/table/table.component';


@NgModule({
  declarations: [
    LisPostsComponent, TableComponent
  ],
  imports: [
    CommonModule,
    LisPostsRoutingModule,
    MaterialModule
  ]
})
export class LisPostsModule { }
