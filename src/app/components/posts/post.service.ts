import { Injectable } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { 
  collection, DocumentData, getDocs, QuerySnapshot, doc ,getDoc, deleteDoc, updateDoc, setDoc, addDoc
} from "firebase/firestore";
import { Observable } from 'rxjs';
import {finalize, map, takeLast} from 'rxjs/operators';
import { PostI } from 'src/app/shared/models/post.interface';
import { FileI } from 'src/app/shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  public db;
  private filepath: any;
  private downLoadURL!: Observable<string>
  constructor(private storage:AngularFireStorage) { 
    this.db = getFirestore()
  }
  public getAllPosts(){
    const querySnapshot:Promise<QuerySnapshot<DocumentData>> =  getDocs(collection(this.db, "posts") );
      return querySnapshot.then(data => data.docs.map(x => {
        const id = x.id
        const datos = x.data();
        return {id, ...datos}
      }))
  }

  public async getOnePost(id: PostI){
    const querySnapshot = await getDoc(doc(this.db, 'posts', `${id}`));
    return querySnapshot.data()
  }

  public async deletePostById(post: PostI){
    const del = await deleteDoc(doc(this.db, 'posts', `${post.id}`))
    console.log(del);
    return del;
  }

  public async updatePostById(post: PostI){
    const update = await updateDoc(doc(this.db, 'posts', `${post.id}`), {
      "titlePost": post.titlePost,
      "tagsPost": post.tagsPost
    })
    console.log(update)
    return update;
  }


  public uploadImage(post:PostI, image:FileI){
    return new Promise<void>((resolve,reject) => {
      this.filepath = `images/${image.name}`;
      const storageRef = this.storage.ref(this.filepath);
      const task = this.storage.upload(this.filepath, image)
      task.snapshotChanges().pipe(finalize(() => {
        storageRef.getDownloadURL().subscribe(urlImage => {
          this.downLoadURL = urlImage;
          this.savePost(post).then(() => {
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

  private async savePost(post:PostI){
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downLoadURL,
      fileRef: this.filepath,
      tagsPost: post.tagsPost
    }
    if(post.id == ''){
      return await addDoc(collection(this.db, 'posts'), postObj);
    }else{
      return await setDoc(doc(this.db, 'posts', `${post.id}`), postObj);
    }
    
  }
}
