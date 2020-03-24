import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Part } from 'src/app/model';
import { ROOT_PATH } from 'src/app/variables';

import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PartBrowserFacade } from '../state/part-browser.facade';

@Component({
  selector: 'gvr-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.css']
})
export class PartDetailComponent implements OnInit {
  public part$: Observable<Part>;
  public rootPath: string;

  constructor(
    private partFacade: PartBrowserFacade,
    private route: ActivatedRoute,
    @Optional() @Inject(ROOT_PATH) rootPath: string
  ) {
    this.rootPath = rootPath || '/';
  }

  public get loading$(): Observable<boolean> {
    return this.partFacade.partListLoading$;
  }

  public get filteredKeys(): string[] {
    return ['image', 'name', 'notes'];
  }

  ngOnInit(): void {
    this.partFacade.loadPartList();
    this.part$ = combineLatest([
      this.route.params,
      this.partFacade.partList$
    ]).pipe(
      filter(([params, partList]) => !!params && !!partList),
      map(([params, partList]) => {
        const specifiedCategory = params.category;
        const specifiedId = params.id;
        if (!specifiedCategory || !specifiedId) {
          return null;
        }

        const relatedCategory = partList.categories.find(
          c => c.id === specifiedCategory
        );
        if (!relatedCategory) {
          return null;
        }

        return relatedCategory.parts.find(p => p.id === specifiedId);
      })
    );
  }
}
