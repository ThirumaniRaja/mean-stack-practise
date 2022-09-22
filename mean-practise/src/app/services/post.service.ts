import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
private post: Post[] = [];
  constructor() { }

  getPosts(){
    return [...this.post];
  }

  addPost(title:string,content:string){
    const createPost:Post = {
      title:title,
      content:content
    }
    this.post.push(createPost);
  }


}
