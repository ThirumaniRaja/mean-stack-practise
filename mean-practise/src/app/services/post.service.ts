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

  //edit post
  getPostList(id:string){
    return {...this.post.find(post=> post.id === id)} as Post;
  }

  //update post
  updatePost(id:string,title:string,content:string){
    const updatePostList: Post = {id: id, title: title, content: content };
    this.Http.put(`${this.URL}/${id}`,updatePostList).subscribe((result) => {
      // const updatedPost = this.post.filter(post=> post.id !== id)
      // this.post = updatedPost;
      // this.addPostSubject.next([...this.post])
      console.log("post-updated",result);
    })
  }



  addPost(title:string,content:string){
    const createPost:Post = {
      id:null,
      title:title,
      content:content
    }
    this.Http.post<any>(this.URL,createPost).subscribe(data=>{
      console.log("post-create",data);
      createPost.id = data.postId;
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
