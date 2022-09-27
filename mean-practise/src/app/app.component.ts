import { Component } from '@angular/core';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
addedPostList:any = [];
  // onPostAdded(post: Post){
  //   this.addedPostList.push(post);
  // }
}
