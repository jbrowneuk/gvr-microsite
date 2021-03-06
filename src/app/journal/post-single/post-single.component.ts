import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostData } from '../model';
import { JournalFacade } from '../state/journal.facade';

@Component({
  selector: 'gvr-post-single',
  templateUrl: './post-single.component.html'
})
export class PostSingleComponent implements OnInit {
  public postData$: Observable<PostData>;

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
        const slug = params.slug;
        if (!slug) {
          return throwError('No param');
        }

        this.postFacade.loadPostBySlug(slug);
        return this.postFacade.currentPost$;
      })
    );
  }
}
