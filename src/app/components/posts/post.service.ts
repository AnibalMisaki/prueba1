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
    return del;
  }

  public async updatePostById(post: PostI){
    console.log(post)
    return await setDoc(doc(this.db, 'posts', `${post.id}`), post)
  }


  public uploadImage(post:PostI, image:FileI){
    let option = '';
    if(post.id){
      option = 'edit';
    }else{
      option = 'add'
    }
    return new Promise<void>((resolve,reject) => {
      this.filepath = `images/${image.name}`;
      const storageRef = this.storage.ref(this.filepath);
      const task = this.storage.upload(this.filepath, image)
      task.snapshotChanges().pipe(finalize(() => {
        storageRef.getDownloadURL().subscribe(urlImage => {
          this.downLoadURL = urlImage;
          this.savePost(post, option).then(() => {
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

  async savePost(post:PostI, option:string){
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downLoadURL,
      fileRef: this.filepath,
      tagsPost: post.tagsPost
    }
    if(option == 'add'){
      return await addDoc(collection(this.db, 'posts'), postObj);
    }else if(option == 'edit'){
      console.log(post)
      return await setDoc(doc(this.db, 'posts', `${post.id}`), postObj)
    }
      
    
  }
}
