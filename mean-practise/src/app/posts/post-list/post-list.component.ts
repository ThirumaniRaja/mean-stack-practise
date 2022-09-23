import { Component, OnInit} from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  // postList = [
  //   {id:1, title:"Java", content: "Programming language"},
  //   {id:2, title:"HTML", content: "interpreted language"},
  //   {id:3, title:"MySQL", content: "Database"},
  //   {id:4, title:"JavaScript", content: "Programming language"}
  // ]

  postList:any = [];

  constructor(public postService:PostService) { }

  ngOnInit(): void {
    // this.postList = this.postService.getPosts();
    this.postService.getPostsListener().subscribe((postData:Post[])=>{
      this.postList = postData
    })
  }

}
