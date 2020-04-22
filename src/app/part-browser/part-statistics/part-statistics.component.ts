import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PartCategory } from 'src/app/model';

import { Component, OnInit } from '@angular/core';

import { PartBrowserFacade } from '../state/part-browser.facade';

type PropSummary = [string, number];

const unknownTitle = 'Unknown';

function propertySummaryGenerator(
  category: PartCategory,
  property: string,
  nameExtractionCb?: (data: string) => string
): PropSummary[] {
  const properties: PropSummary[] = [];
  const callback = nameExtractionCb ? nameExtractionCb : data => data;

  const addCountToProperty = (name: string) => {
    let relatedSummary = properties.find(kvp => kvp[0] === name);
    if (!relatedSummary) {
      relatedSummary = [name, 0];
      properties.push(relatedSummary);
    }

    relatedSummary[1] += 1;
  };

  category.parts.forEach(p => {
    if (!p.data || !p.data[property]) {
      addCountToProperty(unknownTitle);
      return;
    }

    const propertyName = callback(p.data[property]);
    addCountToProperty(propertyName);
  });

  return properties.sort((a, b) => `${a[0]}`.localeCompare(`${b[0]}`));
}

function decadeStatisticGenerator(category: PartCategory): PropSummary[] {
  const callback = (input: string) => Math.floor(+input / 10) + '0s';
  return propertySummaryGenerator(category, 'yearOfManufacture', callback);
}

function wheelConfGenerator(category: PartCategory): PropSummary[] {
  return propertySummaryGenerator(category, 'wheelArrangement');
}

function locoTypeGenerator(category: PartCategory): PropSummary[] {
  return propertySummaryGenerator(category, 'locomotiveType');
}

function depictedEraGenerator(category: PartCategory): PropSummary[] {
  return propertySummaryGenerator(category, 'depictedEra', i => `Era ${i}`);
}

@Component({
  selector: 'gvr-part-statistics',
  templateUrl: './part-statistics.component.html',
  styleUrls: ['./part-statistics.component.css']
})
export class PartStatisticsComponent implements OnInit {
  public readonly statTables: Array<[string, Observable<PropSummary[]>]>;
  public readonly locomotiveCategory$: Observable<PartCategory>;

  constructor(private partFacade: PartBrowserFacade) {
    this.locomotiveCategory$ = this.partFacade.partList$.pipe(
      filter(p => !!p),
      map(l => l.categories.find(c => c.id === 'locomotives'))
    );

    this.statTables = [
      ['Type', this.locoType$],
      ['Decade model manufactured', this.locoManufactureDecade$],
      ['Depicted era of model', this.locoDepictedEra$],
      ['Wheel arrangement', this.locoWheelArrangement$]
    ];
  }

  public get locoManufactureDecade$(): Observable<PropSummary[]> {
    return this.locomotiveCategory$.pipe(
      filter(p => !!p),
      map(decadeStatisticGenerator)
    );
  }

  public get locoWheelArrangement$(): Observable<PropSummary[]> {
    return this.locomotiveCategory$.pipe(
      filter(p => !!p),
      map(wheelConfGenerator)
    );
  }

  public get locoType$(): Observable<PropSummary[]> {
    return this.locomotiveCategory$.pipe(
      filter(p => !!p),
      map(locoTypeGenerator)
    );
  }

  public get locoDepictedEra$(): Observable<PropSummary[]> {
    return this.locomotiveCategory$.pipe(
      filter(p => !!p),
      map(depictedEraGenerator)
    );
  }

  ngOnInit(): void {
    this.partFacade.loadPartList();
  }

  public generateTableId(name: string): string {
    return name.toLowerCase().replace(/\s/g, '-');
  }
}
