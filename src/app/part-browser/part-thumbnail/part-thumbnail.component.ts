import { Part } from 'src/app/model';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'gvr-part-thumbnail',
  templateUrl: './part-thumbnail.component.html',
  styleUrls: ['./part-thumbnail.component.css']
})
export class PartThumbnailComponent {
  @Input() public part: Part;
  @Input() public rootPath: string;
}
