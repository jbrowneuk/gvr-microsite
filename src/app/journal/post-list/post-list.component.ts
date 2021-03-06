import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostDataWrapper } from '../model';
import { JournalFacade } from '../state/journal.facade';

@Component({
  selector: 'gvr-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  public postData$: Observable<PostDataWrapper>;

  constructor(
    private postFacade: JournalFacade,
    private route: ActivatedRoute
  ) {}

  public get loading$(): Observable<boolean> {
    return this.postFacade.postListLoading$;
  }

  ngOnInit(): void {
    this.postData$ = this.route.params.pipe(
      switchMap(params => {
        const page = +params.page || 1;
        this.postFacade.loadPostList(page);
        return this.postFacade.postList$;
      })
    );
  }
}
