import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { PartCategory } from 'src/app/model';

import { Component, OnInit } from '@angular/core';

import { PartBrowserFacade } from '../state/part-browser.facade';
import { CostCategory, CostSummary } from './cost-summary';

function sumReducer(accumulator: number, currentValue: number) {
  return accumulator + currentValue;
}

function categoryMapper(category: PartCategory): CostCategory {
  const itemCount = category.parts.map(p => p.required).reduce(sumReducer);

  const actualCost = category.parts
    .map(p => {
      const costSingle = p.actualCost > 0 ? p.actualCost : p.retailCost;
      return costSingle * p.required;
    })
    .reduce(sumReducer);

  return {
    name: category.name,
    id: category.id,
    items: itemCount,
    cost: actualCost,
    icon: category.icon || 'box-full'
  };
}

function costSummaryGenerator(categories: CostCategory[]): CostSummary {
  let totalItems = 0;
  let totalCost = 0;
  categories.forEach(c => {
    totalItems += c.items;
    totalCost += c.cost;
  });

  return { categories, totalItems, totalCost };
}

@Component({
  selector: 'gvr-part-summary',
  templateUrl: './part-summary.component.html',
  styleUrls: ['./part-summary.component.css']
})
export class PartSummaryComponent implements OnInit {
  public lastUpdated: string;
  public costsVisible: boolean;

  constructor(private partFacade: PartBrowserFacade) {
    this.costsVisible = false;
  }

  public get loading$(): Observable<boolean> {
    return this.partFacade.partListLoading$;
  }

  public get costSummary$(): Observable<CostSummary> {
    return this.partFacade.partList$.pipe(
      filter(p => !!p),
      tap(parts => (this.lastUpdated = parts.lastUpdate)),
      map(parts => parts.categories.map(categoryMapper)),
      map(costSummaryGenerator)
    );
  }

  ngOnInit(): void {
    this.partFacade.loadPartList();
  }
}
