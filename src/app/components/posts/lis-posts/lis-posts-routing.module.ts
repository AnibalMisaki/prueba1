import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LisPostsComponent } from './lis-posts.component';

const routes: Routes = [{ path: '', component: LisPostsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LisPostsRoutingModule { }
