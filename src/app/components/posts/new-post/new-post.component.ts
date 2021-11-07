import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostI } from 'src/app/shared/models/post.interface';
import { PostService } from '../post.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  private image:any;
  constructor(private postSvc:PostService, private modal:ModalComponent) { }
  public newPostForm = new FormGroup({
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  addNewPost(data: PostI){
    console.log(data);
    this.postSvc.uploadImage(data, this.image).then(()=>{
      console.log("resolved")
      this.modal.dialog.close();
    }).catch(error => console.log(error));
  }

  handleImage(e:any):void{
    this.image = e.target.files[0];
  }

}
