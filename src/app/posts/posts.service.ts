import { Injectable } from '@angular/core';
import { Post } from './post.model'
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated =new  Subject<Post[]>();
  constructor(private http:HttpClient) { }

  getPosts() {
    this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
    .pipe(map(postData =>{
      return postData.posts.map(post => {
        return {
          title:post.title,
          content:post.content,
          id:post._id
        }
      });
    }))
    .subscribe((transformedPost) => {
     this.posts =transformedPost;
     this.postsUpdated.next([...this.posts]);
    })
  }
  getPostUpdatedListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(title: string,content: string){
  const post:Post = {id:null,title:title ,content: content};
  this.http.post<{message:string}>('http://localhost:3000/api/posts',post)
  .subscribe((response) => {
  console.log(response.message)
  this.posts.push(post)
  this.postsUpdated.next([...this.posts]);
  })
  
  }
}
