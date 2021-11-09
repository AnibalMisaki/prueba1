import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { PostI } from 'src/app/shared/models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {


  @Input() post!: PostI;
  
  constructor() { }

  ngOnInit(): void {
  
  }


}
