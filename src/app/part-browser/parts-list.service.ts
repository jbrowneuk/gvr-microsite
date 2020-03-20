import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import { PartList } from '../model';
import { ROOT_PATH } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class PartsListService {
  protected rootPath: string;

  constructor(
    private http: HttpClient,
    @Optional() @Inject(ROOT_PATH) rootPath: string
  ) {
    this.rootPath = rootPath || '/';
  }

  public fetchPartList(): Observable<PartList> {
    return this.http.get<PartList>(`${this.rootPath}parts-list.json`);
  }
}
