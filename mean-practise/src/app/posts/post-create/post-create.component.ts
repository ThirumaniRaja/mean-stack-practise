import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "src/app/services/post.service";

import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";
  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService){

  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    // this.postCreated.emit(post);
    this.postService.addPost(form.value.title,form.value.content);
  }
}
