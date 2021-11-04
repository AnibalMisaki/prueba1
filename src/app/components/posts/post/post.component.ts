import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostI } from 'src/app/shared/models/post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  objeto:PostI[] = []
  datos:any[] = []
  show:boolean = false;
  constructor(private route:ActivatedRoute, private svc:PostService) { }

  async ngOnInit() {
    const idPost = this.route.snapshot.params.id;
    this.datos.push(await this.svc.getOnePost(idPost).then(y => y));
    this.objeto = this.datos 
    if(this.objeto){
      this.show = true;
    }
  }

}
