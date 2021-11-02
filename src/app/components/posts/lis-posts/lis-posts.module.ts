import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LisPostsRoutingModule } from './lis-posts-routing.module';
import { LisPostsComponent } from './lis-posts.component';


@NgModule({
  declarations: [
    LisPostsComponent
  ],
  imports: [
    CommonModule,
    LisPostsRoutingModule
  ]
})
export class LisPostsModule { }
