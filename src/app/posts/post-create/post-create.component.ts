import { Component ,EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from '../post.model'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from "./mime-type.validators"
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {
  // @Output() postCreated = new EventEmitter<Post>();
  form: FormGroup
  private mode = 'create'
  private id: string;
  isloading = false;
   post:Post
   imagePreview:string;
  constructor(public postsService :PostsService, public route:ActivatedRoute) {
  
  }
  ngOnInit(){
    this.form = new FormGroup({
      'title': new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      'content': new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      'image':new FormControl(null,{
        validators:[Validators.required],
        asyncValidators: [mimeType]
      })
    })
    this.route.paramMap.subscribe((paramMap:ParamMap) =>{
      if(paramMap.has('id')){
        this.mode = 'edit'
        this.id=paramMap.get('id');
        this.isloading=true;
     this.postsService.getPost(this.id).subscribe(postData => {
      this.isloading = false;
      this.post = {
        id:postData._id,
        title:postData.title,
        content:postData.content,
        imagePath:null
      }
      this.form.setValue({
        title:this.post.title,
         content:this.post.content
      })
     });
      }
      else{
        this.mode = 'create'
        this.id=null;
      }
    });
  }
 

  onSavePost(){
    // if(this.form.invalid) return;
    // const post:Post = {
    //   title:form.value.title,
    //   content:form.value.content
    // }
    //this.postCreated.emit(post)
    if(this.mode === 'create'){
      this.postsService.addPost(this.form.value.title,this.form.value.content,this.form.value.image)
      this.form.reset();
    }
    else{
      this.postsService.updatePost(this.id,this.form.value.title,this.form.value.content)
      this.form.reset();
    }
    
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file})
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
    console.log(file)
    console.log(this.form.get('image'))
  }
 
}
