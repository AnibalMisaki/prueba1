import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { PostService } from '../../posts/post.service';
import { PostI } from 'src/app/shared/models/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  datos:PostI[] = []
  show:boolean = false;
  constructor(private svc: PostService) { }

  async ngOnInit() {
    
    this.datos = await this.svc.getAllPosts().then(y => y as PostI[])
    if(this.datos){
      this.show = true;
    }
  }

}
