import { Component, OnInit, Input } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  img1 = '/assets/perro-1.jpg';
  img2 = '/assets/perro-2.jpg';
  img3 = '/assets/perro-3.jpg';

  @Input() post: IPost;

  constructor() { }

  ngOnInit() {}

}
