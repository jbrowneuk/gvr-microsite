import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ROOT_PATH } from '../variables';
import { JournalService } from './journal.service';
import { PostData, PostDataWrapper, PostStatus } from './model';

const mockRootPath = '/test/gvr/';

describe('Journal Service', () => {
  let service: JournalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ROOT_PATH, useValue: mockRootPath }]
    });

    service = TestBed.inject(JournalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts for specific page', done => {
    const expectedPage = 2;
    const mockPostData: PostDataWrapper = {
      posts: [],
      page: expectedPage,
      totalPages: expectedPage
    };

    service.fetchPosts(expectedPage).subscribe({
      next: data => {
        expect(data).toEqual(mockPostData);
      },
      complete: () => done()
    });

    const req = httpMock.expectOne(
      `${mockRootPath}api/?posts&page=${expectedPage}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPostData);
  });

  it('should fetch post by slug identifier', done => {
    const expectedSlug = 'test-post';
    const mockPost: PostData = {
      postId: 1,
      title: 'test post',
      content: 'a test post',
      slug: expectedSlug,
      tags: ['test', 'post'],
      date: 123456789,
      modified: null,
      status: PostStatus.Publish
    };

    service.fetchPostBySlug(expectedSlug).subscribe({
      next: data => {
        expect(data).toEqual([mockPost]);
      },
      complete: () => done()
    });

    const req = httpMock.expectOne(
      `${mockRootPath}api/?posts&slug=${expectedSlug}`
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockPost]);
  });
});
