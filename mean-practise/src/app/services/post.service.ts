import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
private post: Post[] = [];
private addPostSubject = new Subject<Post[]>();
  constructor() { }

  getPosts(){
    return [...this.post];
  }

  getPostsListener(){
    return this.addPostSubject.asObservable();
  }

  addPost(title:string,content:string){
    const createPost:Post = {
      title:title,
      content:content
    }
    this.post.push(createPost);
    this.addPostSubject.next([...this.post])
  }


}
