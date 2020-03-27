import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { SharedModule } from 'src/app/shared/shared.module';

import { formatDate } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LOCALE_ID } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostData, PostStatus } from '../model';
import { PostComponent } from './post.component';

const mockPostData: PostData = {
  postId: 1,
  date: 1577880720, // 2020-01-01T12:12:00Z
  modified: null,
  title: 'mock post',
  content: 'mock post',
  tags: ['mock', 'post'],
  slug: 'mock-post',
  status: PostStatus.Publish
};

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let pageObject: PostPageObject;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [HttpClientTestingModule, SharedModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    pageObject = new PostPageObject(fixture);
    component = fixture.componentInstance;
    component.postData = mockPostData;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    expect(pageObject.title.textContent.trim()).toBe(mockPostData.title);
  });

  it('should display date in correct formats', () => {
    // Convert date/time using test runner’s timeZone
    const currentLocale = TestBed.inject(LOCALE_ID);
    const epochMsec = mockPostData.date * 1000;
    const expectedAttrValue = formatDate(
      epochMsec,
      'yyyy-MM-ddTHH:mmZ',
      currentLocale
    );
    const expectedDayValue = formatDate(epochMsec, 'd', currentLocale);

    const expectedMonthYearValue = formatDate(
      epochMsec,
      'MMM yyyy',
      currentLocale
    );

    expect(pageObject.dateContainer.dateTime).toBe(expectedAttrValue);
    expect(pageObject.dateDay.textContent.trim()).toBe(expectedDayValue);
    expect(pageObject.dateMonthYear.textContent.trim()).toBe(
      expectedMonthYearValue
    );
  });

  it('should display post content', () => {
    expect(pageObject.postContent.textContent.trim()).toBe(
      mockPostData.content
    );
  });

  it('should display tags', () => {
    const tagElements = pageObject.tags;
    mockPostData.tags.forEach(tag => {
      const relatedElement = tagElements.find(t => t.dataset.postTag === tag);
      expect(relatedElement).toBeTruthy();
      expect(relatedElement.textContent.trim()).toContain(tag);
    });
  });
});

class PostPageObject extends PageObjectBase<PostComponent> {
  public get title(): HTMLHeadingElement {
    return this.select('[data-title]');
  }

  public get dateContainer(): HTMLTimeElement {
    return this.select('[data-date]');
  }

  public get dateDay(): HTMLSpanElement {
    return this.select('[data-day]');
  }

  public get dateMonthYear(): HTMLSpanElement {
    return this.select('[data-month-year]');
  }

  public get postContent(): HTMLElement {
    return this.select('[data-post-content]');
  }

  public get tags(): HTMLLIElement[] {
    return this.selectAll('[data-post-tags] [data-post-tag]');
  }
}
