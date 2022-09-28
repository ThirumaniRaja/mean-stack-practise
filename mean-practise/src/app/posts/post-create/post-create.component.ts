import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from "src/app/models/mimeType.validator";
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
  public isLoading = false;
  public form!: FormGroup;
  public imagePreview : string | any;
  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.form = new FormGroup({
      "title": new FormControl(null,{ validators: [Validators.required] }),
      "content": new FormControl(null,{ validators: [Validators.required] }),
      "image": new FormControl(null,{ validators: [Validators.required], asyncValidators:[mimeType] })
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = MODE.EDIT;
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        // this.editPost  = this.postService.getPostList(this.postId as string);
         this.postService.getPostList(this.postId as string).subscribe(post=>{
          this.isLoading = false;
          this.editPost = {id: post._id, title: post.title, content: post.content};
          this.form?.setValue({
            "title": this.editPost.title,
            "content": this.editPost.content,
          })
         })
      }
      else{
        this.mode = MODE.CREATE;
        this.postId = null;
      }
    })
  }

  onSavePost() {
    if (this.form?.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === MODE.CREATE){
      this.postService.addPost(this.form?.value.title,this.form?.value.content);
    }
    else if(this.mode === MODE.EDIT){
      this.postService.updatePost(this.postId as string,this.form?.value.title,this.form?.value.content);
    }
    this.form?.reset();
  }

  onImageClick(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image:file});
    this.form.get('image')?.updateValueAndValidity();
    console.log("image",file)
    console.log("image->form",this.form)

    const reader = new FileReader();
    reader.onload = () => {
     this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);

  }
}
