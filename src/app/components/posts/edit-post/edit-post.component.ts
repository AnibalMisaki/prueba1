import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { PostI } from 'src/app/shared/models/post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  private image:any;
  private imageOriginal:any;

  @Input() post?:PostI;
  constructor(private postSvc:PostService, private modal:ModalComponent) { }
  public editPostForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    this.image = this.post?.imagePost;
    this.imageOriginal = this.post?.imagePost;
    this.initVAluesForm();
  }

  editPost(post:PostI){
    if(this.image == this.imageOriginal){
      post.imagePost = this.imageOriginal;
      this.postSvc.updatePostById(post).then(()=>{
        console.log("resolved")
        this.modal.dialog.close();
      }).catch(error => console.log(error));
      //call method(post)
    }else{
      this.postSvc.uploadImage(post, this.image).then(()=>{
        console.log("resolved")
        this.modal.dialog.close();
      }).catch(error => console.log(error));
      //call method(post, this.image)
    }
  }
  handleImage(e:any):void{
    this.image = e.target.files[0];
  }

  private initVAluesForm():void{
     this.editPostForm.patchValue({
       id: this.post?.id,
       titlePost: this.post?.titlePost,
       contentPost: this.post?.contentPost,
       tagsPost: this.post?.tagsPost,
     })
  }
}
