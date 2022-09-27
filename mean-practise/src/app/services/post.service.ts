import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, sample, Subject } from 'rxjs';
import { Post, PostResponse } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
private post: Post[] = [];
private addPostSubject = new Subject<Post[]>();
private URL = "http://localhost:3000/api/posts";
  constructor(private Http:HttpClient) {

  }

  getPosts(){
    this.Http.get<any>(this.URL).pipe(map((postResponse)=>{
      return postResponse.post.map(((post:any)=>{
        return {
          id: post._id,
          title: post.title,
          content: post.content
        };
      }))
    }))
    .subscribe((postData)=>{
      console.log("postData",postData)
      this.post = postData;
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
    this.Http.post<any>(this.URL,createPost).subscribe(data=>{
      console.log("post-create",data);
      this.post.push(createPost);
      this.addPostSubject.next([...this.post])
    });

  }

  deletePost(id:string){
    // console.log(`${this.URL}/${id}`,id)
    this.Http.delete(`${this.URL}/${id}`).subscribe(()=>{
      //my usually method
      // if(status === 'post deleted'){
      //   this.getPosts()
      // }

      //course method
      const updatedPost = this.post.filter(post=> post.id !== id)
      this.post = updatedPost;
      this.addPostSubject.next([...this.post])
      console.log("post-Deleted");
    })
  }

  editPost(post:Post){

  }


}
