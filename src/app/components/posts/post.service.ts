import { Injectable } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { collection, getDocs } from "firebase/firestore";
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { PostI } from 'src/app/shared/models/post.interface';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  arreglo:any[] = [];
  interface:PostI[] = []
  constructor() { }
  public getAllPosts(){
    const db = getFirestore();
    const querySnapshot =  getDocs<PostI[]>(collection(db, "posts"));
      return querySnapshot.then(data => data.map(x => x.data))

  }
}
