import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ROOT_PATH } from '../variables';
import { PartsListService } from './parts-list.service';

const mockRootPath = '/test/gvr/';

describe('PartsListService', () => {
  let service: PartsListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ROOT_PATH, useValue: mockRootPath }]
    });

    service = TestBed.inject(PartsListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch part list', done => {
    const mockParts = {
      lastUpdate: '2020-03-19T23:42Z',
      categories: []
    };

    service.fetchPartList().subscribe({
      next: data => {
        expect(data).toEqual(mockParts);
      },
      complete: () => done()
    });

    const req = httpMock.expectOne(`${mockRootPath}parts-list.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockParts);
  });
});
