import { Component ,EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from '../post.model'
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {
  // @Output() postCreated = new EventEmitter<Post>();
  private mode = 'create'
  private id: string;
   post:Post
  constructor(public postsService :PostsService, public route:ActivatedRoute) {
  
  }
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap:ParamMap) =>{
      if(paramMap.has('id')){
        this.mode = 'edit'
        this.id=paramMap.get('id');
     this.postsService.getPost(this.id).subscribe(postData => {
      this.post = {id:postData._id,title:postData.title,content:postData.content}
     });
      }
      else{
        this.mode = 'create'
        this.id=null;
      }
    });
  }
 

  onSavePost(form:NgForm){
    if(form.invalid) return;
    // const post:Post = {
    //   title:form.value.title,
    //   content:form.value.content
    // }
    //this.postCreated.emit(post)
    if(this.mode === 'create'){
      this.postsService.addPost(form.value.title,form.value.content)
      form.resetForm();
    }
    else{
      this.postsService.updatePost(this.id,form.value.title,form.value.content)
      form.resetForm();
    }
    
  }
  
 
}
