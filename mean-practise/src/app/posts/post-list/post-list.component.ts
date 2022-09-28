import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit , OnDestroy {
 private postSub$:Subscription | undefined ;
 public isLoading = false;
  // postList = [
  //   {id:1, title:"Java", content: "Programming language"},
  //   {id:2, title:"HTML", content: "interpreted language"},
  //   {id:3, title:"MySQL", content: "Database"},
  //   {id:4, title:"JavaScript", content: "Programming language"}
  // ]

  postList:any = [];

  constructor(public postService:PostService) { }


  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSub$ = this.postService.getPostsListener().subscribe((postData:Post[])=>{
      this.isLoading = false;
      this.postList = postData;
    })
  }

  onDeletePost(id:string){
    // console.log(id)
    this.postService.deletePost(id)
  }

  onEditPost(){

  }

  ngOnDestroy(): void {
    this.postSub$?.unsubscribe();
  }

}
