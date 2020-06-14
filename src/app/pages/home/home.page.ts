import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  posts: IPost[] = [];
  habilitarInfinitScroll: Boolean = true;

  constructor(
    private postService: PostsService
  ) { }

  ngOnInit() {
    this.siguientesPosts();
  }
  
  recargar( event ) {
    this.habilitarInfinitScroll = true;
    this.posts = [];
    this.siguientesPosts(event, true);
  }

  siguientesPosts( event?, pull: boolean = false ) {
    this.postService.getPosts( pull )
    .subscribe(respuesta => {
      this.posts.push( ...respuesta.posts );
      if(event) {
        event.target.complete();
        if(respuesta.posts.length === 0) {
          this.habilitarInfinitScroll = false;
        }
      }
    });
  }


}
