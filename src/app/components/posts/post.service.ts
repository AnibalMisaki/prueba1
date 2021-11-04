import { Injectable } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { collection, DocumentData, getDocs, QuerySnapshot, doc ,getDoc} from "firebase/firestore";
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { PostI } from 'src/app/shared/models/post.interface';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor() { }
  public getAllPosts(){
    const db = getFirestore();
    const querySnapshot:Promise<QuerySnapshot<DocumentData>> =  getDocs(collection(db, "posts") );
      return querySnapshot.then(data => data.docs.map(x => {
        const id = x.id
        const datos = x.data();
        return {id, ...datos}
      }))
  }

  public async getOnePost(id: PostI){
    const db = getFirestore();
    const querySnapshot = await getDoc(doc(db, 'posts', `${id}`));
    return querySnapshot.data()
  }
}
