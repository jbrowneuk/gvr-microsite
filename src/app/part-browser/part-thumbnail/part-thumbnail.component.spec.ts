import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { Part } from 'src/app/model';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PartThumbnailComponent } from './part-thumbnail.component';

describe('PartThumbnailComponent', () => {
  const rootPath = '/test/';
  const basePart = {
    id: 'part-id',
    manufacturer: 'part-manufacturer',
    name: 'Part Name',
    retailCost: 4.2,
    actualCost: 4,
    required: 69,
    acquired: 0
  };
  const partWithImage: Part = Object.assign({ image: 'image.jpg' }, basePart);
  const partNoImage: Part = Object.assign({ image: '' }, basePart);
  const partInStorage: Part = Object.assign(
    { image: 'any.png', data: { inStorage: true } },
    basePart
  );

  let component: PartThumbnailComponent;
  let fixture: ComponentFixture<PartThumbnailComponent>;
  let pageObject: PartThumbnailPageObject;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartThumbnailComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PartThumbnailComponent);
    pageObject = new PartThumbnailPageObject(fixture);
    component = fixture.componentInstance;
    component.rootPath = rootPath;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image if image value is valid', async(() => {
    component.part = partWithImage;
    fixture.detectChanges();

    expect(pageObject.imageElement).toBeTruthy();
    expect(pageObject.imageElement.src).toContain(`${rootPath}`);
    expect(pageObject.imageElement.src).toContain(`${partWithImage.image}`);

    expect(pageObject.noImageElement).toBeFalsy();
  }));

  it('should display image if image value is valid', async(() => {
    component.part = partNoImage;
    fixture.detectChanges();

    expect(pageObject.imageElement).toBeFalsy();
    expect(pageObject.noImageElement).toBeTruthy();
  }));

  it('should display storage overlay if part is in storage', async(() => {
    component.part = partInStorage;
    fixture.detectChanges();

    expect(pageObject.storageOverlay).toBeTruthy();
  }));

  it('should display part manufacturer', async(() => {
    component.part = partWithImage;
    fixture.detectChanges();

    expect(pageObject.manufacturer).toBeTruthy();
    expect(pageObject.manufacturer.textContent).toContain(
      partWithImage.manufacturer
    );
  }));

  it('should display part count', async(() => {
    component.part = partWithImage;
    fixture.detectChanges();

    expect(pageObject.itemCount).toBeTruthy();
    expect(pageObject.itemCount.textContent).toContain(
      `×${partWithImage.acquired}`
    );
  }));

  it('should display part name', async(() => {
    component.part = partWithImage;
    fixture.detectChanges();

    expect(pageObject.name).toBeTruthy();
    expect(pageObject.name.textContent).toContain(partWithImage.name);
  }));
});

class PartThumbnailPageObject extends PageObjectBase<PartThumbnailComponent> {
  get imageElement(): HTMLImageElement {
    return this.select('[data-image]');
  }

  get noImageElement(): HTMLDivElement {
    return this.select('[data-no-image]');
  }

  get storageOverlay(): HTMLDivElement {
    return this.select('[data-storage-overlay]');
  }

  get manufacturer(): HTMLDivElement {
    return this.select('[data-manufacturer]');
  }

  get itemCount(): HTMLDivElement {
    return this.select('[data-item-count]');
  }

  get name(): HTMLDivElement {
    return this.select('[data-title]');
  }
}
