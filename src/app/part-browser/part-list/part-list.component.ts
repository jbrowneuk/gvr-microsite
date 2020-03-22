import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PartCategory } from 'src/app/model';
import { ROOT_PATH } from 'src/app/variables';

import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PartBrowserFacade } from '../state/part-browser.facade';

@Component({
  selector: 'gvr-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
export class PartListComponent implements OnInit {
  public category$: Observable<PartCategory>;
  public lastUpdated: string;
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

  ngOnInit(): void {
    this.partFacade.loadPartList();
    this.category$ = combineLatest([
      this.route.params,
      this.partFacade.partList$
    ]).pipe(
      filter(([params, partlist]) => !!params && !!partlist),
      map(([params, partList]) => {
        this.lastUpdated = partList.lastUpdate;
        const specifiedCategory = params.category;
        if (!specifiedCategory) {
          return null;
        }

        return partList.categories.find(c => c.id === specifiedCategory);
      })
    );
  }
}
