import { Component,Input,OnDestroy,OnInit } from '@angular/core';
import {Post} from '../post.model'
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit ,OnDestroy{

// @Input() posts:Post[] =[];
    posts:Post[] =[];
    private postsSub :Subscription
    private authListnerSubs :Subscription
    isloading = false;
    totalPosts=0;
    postPerPage=2;
    currentPage=1;
    pageSizeOptions=[1,2,5,10]
  userIsAuthenticated = false;;
constructor(public postsService :PostsService, private authService: AuthService) {
  
 }
 
  ngOnInit(): void {
    this.postsService.getPosts(this.postPerPage,this.currentPage);
    this.isloading=true;
    this.postsSub = this.postsService.getPostUpdatedListener().subscribe((postsData:{posts:Post[],postCount:number})=>{
      this.isloading=false;
      this.totalPosts = postsData.postCount;
      this.posts=postsData.posts;
    })
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
     });
  }
  onDelete(id:string){
    this.isloading=true;
   this.postsService.deletePost(id).subscribe(()=>{
    this.postsService.getPosts(this.postPerPage,this.currentPage);
   });
  }
  onChangedPage(pageData:PageEvent){
    this.isloading=true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authListnerSubs.unsubscribe();
  }
 
}
