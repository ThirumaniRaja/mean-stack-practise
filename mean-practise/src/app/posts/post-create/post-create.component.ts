import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MODE } from "src/app/models/mode.enum";
import { PostService } from "src/app/services/post.service";

import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit{
  enteredTitle = "";
  enteredContent = "";
  private mode: MODE | undefined;
  private postId: string | undefined | null;
  public editPost: Post | undefined ;
  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = MODE.EDIT;
        this.postId = paramMap.get('postId');
        this.editPost  = this.postService.getPostList(this.postId as string);
      }
      else{
        this.mode = MODE.CREATE;
        this.postId = null;
      }
    })
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.mode === MODE.CREATE){
      this.postService.addPost(form.value.title,form.value.content);
    }
    else if(this.mode === MODE.EDIT){
      this.postService.updatePost(this.postId as string,form.value.title,form.value.content);
    }
    form.resetForm();
  }
}
