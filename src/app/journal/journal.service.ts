import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import { ROOT_PATH } from '../variables';
import { PostData, PostDataWrapper } from './model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  protected rootPath: string;

  constructor(
    private http: HttpClient,
    @Optional() @Inject(ROOT_PATH) rootPath: string
  ) {
    this.rootPath = rootPath || '/';
  }

  public fetchPosts(page: number): Observable<PostDataWrapper> {
    return this.http.get<PostDataWrapper>(
      `${this.rootPath}api/?posts&page=${page || 1}`
    );
  }

  public fetchPostBySlug(slug: string): Observable<PostData[]> {
    return this.http.get<PostData[]>(`${this.rootPath}api/?posts&slug=${slug}`);
  }
}
