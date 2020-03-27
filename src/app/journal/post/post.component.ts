import { Component, Input } from '@angular/core';

import { PostData } from '../model';

@Component({
  selector: 'gvr-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() postData: PostData;
}
