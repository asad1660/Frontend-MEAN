import { Component,Input,OnDestroy,OnInit } from '@angular/core';
import {Post} from '../post.model'
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit ,OnDestroy{

// @Input() posts:Post[] =[];
    posts:Post[] =[];
    private postsSub :Subscription

constructor(public postsService :PostsService) {
  
 }
 
  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsService.getPostUpdatedListener().subscribe((posts:Post[])=>{
      this.posts=posts;
    })
  }
  onDelete(id:string){
   this.postsService.deletePost(id);
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
 
}
