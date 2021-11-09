import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserI } from 'src/app/shared/models/user.interface';
import { FileI } from 'src/app/shared/models/file.interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public image?:FileI;
  public currentImage?:string;

  constructor(private authSvc:AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    photoURL: new FormControl('', Validators.required),
  })

  ngOnInit():void{
    //this.initValuesForm(user)
    this.initValuesForm(this.authSvc.user as UserI)
  }

  onSaveUser(user:UserI):void{
    if(this.image){
      this.authSvc.uploadImage(user, this.image!).then(() => {
        this.ngOnInit();
      })
    }else{
      this.authSvc.saveUserProfile(user).then(() => {
        this.ngOnInit();
      }).catch((e) =>{
        console.log('error', e)
      })
    }
    
    
  }

  private initValuesForm(user:UserI):void{
    if(user.photoURL){
      this.currentImage = user.photoURL;
    }
    console.log(user.photoURL)
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
    });
  }

  handleImage(image:any):void{
    this.image = image.target.files[0];
  }
}
