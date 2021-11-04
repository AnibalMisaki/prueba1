import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { getAuth, signInWithEmailAndPassword, signOut, User,onAuthStateChanged } from "firebase/auth";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public user!:User | null;
  constructor() {
  }

  loginByEmail(user: UserI){
    const {email, password} = user;
    const auth = getAuth();
    const sesion = signInWithEmailAndPassword(auth, email, password);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    return sesion

  }

  logOut(){
    const auth = getAuth();
    signOut(auth).then(() =>{
      console.log('Sesion cerrada con exito');
      onAuthStateChanged(auth, (user) => {
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
}
