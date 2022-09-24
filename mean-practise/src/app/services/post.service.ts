import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post, PostResponse } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
private post: Post[] = [];
private addPostSubject = new Subject<Post[]>();
private URL = "http://localhost:3000/api";
  constructor(private Http:HttpClient) {

  }

  getPosts(){
    this.Http.get<PostResponse>(this.URL+'/post').subscribe((postData)=>{
      console.log("postData",postData)
      this.post = postData.post;
      this.addPostSubject.next([...this.post])
    })
  }

  getPostsListener(){
    return this.addPostSubject.asObservable();
  }

  addPost(title:string,content:string){
    const createPost:Post = {
      title:title,
      content:content
    }
    this.Http.post<any>(this.URL+'/posts',createPost).subscribe(data=>{
      console.log("post-create",data);
      this.post.push(createPost);
      this.addPostSubject.next([...this.post])
    });

  }


}
