import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', component: AdminComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: 'posts',
        loadChildren: () => import('../posts/lis-posts/lis-posts.module').then(m => m.LisPostsModule)
      },
      { 
        path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
