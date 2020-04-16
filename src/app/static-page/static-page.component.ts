import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROOT_PATH } from '../variables';

@Component({
  selector: 'gvr-layout',
  templateUrl: './static-page.component.html'
})
export class StaticPageComponent implements OnInit {
  public rootPath: string;
  public requestedFile$: Observable<string>;

  constructor(
    @Optional() @Inject(ROOT_PATH) rootPath: string,
    private route: ActivatedRoute
  ) {
    this.rootPath = rootPath || '/';
  }

  public get markdownPath$(): Observable<string> {
    return this.requestedFile$.pipe(
      map(filename => `${this.rootPath}pages/${filename}.md`)
    );
  }

  ngOnInit() {
    this.requestedFile$ = combineLatest([
      this.route.params,
      this.route.data
    ]).pipe(
      map(([params, data]) => {
        if (data && data.pageOverride) {
          return data.pageOverride;
        }

        if (!params.page) {
          return null;
        }

        return params.page;
      })
    );
  }
}
