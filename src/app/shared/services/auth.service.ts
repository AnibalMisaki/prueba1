import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { getAuth, signInWithEmailAndPassword, signOut, User,onAuthStateChanged } from "firebase/auth";
import { Observable } from 'rxjs';
import { updateProfile } from '@angular/fire/auth';
import { FileI } from '../models/file.interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {finalize} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth
  public user?: User | null;
  private filepath: any;
  private downLoadURL!: Observable<string>
  constructor(private storage:AngularFireStorage) {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }})
  }
  async getUser(){
    return this.user;
  }
  loginByEmail(user: UserI){
    const {email, password} = user;
    
    const sesion = signInWithEmailAndPassword(this.auth, email, password!);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    return sesion

  }

  logOut(){
    
    signOut(this.auth).then(() =>{
      console.log('Sesion cerrada con exito');
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      });
    }).catch((error) =>{
      console.error(error.code + error.message);
    })
  }

  saveUserProfile(user: UserI){
    const userObj = {
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    console.log('User -> ', user)
    return updateProfile(this.user!, user)
  }

  public uploadImage(user:UserI, image:FileI){
    return new Promise<void>((resolve,reject) => {
      this.filepath = `images/${image.name}`;
      const storageRef = this.storage.ref(this.filepath);
      const task = this.storage.upload(this.filepath, image)
      task.snapshotChanges().pipe(finalize(() => {
        storageRef.getDownloadURL().subscribe(urlImage => {
          user.photoURL = urlImage;
          this.saveUserProfile(user).then(() => {
            console.log('Se guardaron las cosas');
            resolve();
          }).catch((error) => {
            console.log('Error' + error);
            reject();
          })
        })
      })).subscribe();

    })

  }
}


