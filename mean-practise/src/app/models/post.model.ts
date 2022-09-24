export interface Post {
  id?:any;
  title: string;
  content: string;
}

export interface PostResponse {
  message:string;
  post:Post[];
}
