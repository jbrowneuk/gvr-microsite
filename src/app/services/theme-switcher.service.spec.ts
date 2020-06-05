import { IMock, It, Mock, Times } from 'typemoq';

import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { themeKey, Themes, ThemeSwitcherService } from './theme-switcher.service';

describe('Theme Switcher Service', () => {
  let service: ThemeSwitcherService;
  let mockDocument: IMock<Document>;
  let mockStorage: any;

  let mockLightSheet: HTMLLinkElement;
  let mockDarkSheet: HTMLLinkElement;

  beforeEach(() => {
    mockLightSheet = {
      title: Themes.Light,
      disabled: false
    } as HTMLLinkElement;

    mockDarkSheet = {
      title: Themes.Dark,
      disabled: true
    } as HTMLLinkElement;

    mockDocument = Mock.ofType<Document>();
    mockDocument
      .setup(s => s.querySelectorAll(It.isAny()))
      .returns(() => [mockLightSheet, mockDarkSheet] as any);

    mockStorage = {};
    spyOn(Storage.prototype, 'getItem').and.callFake(key => mockStorage[key]);
    spyOn(Storage.prototype, 'setItem').and.callFake(
      (key, value) => (mockStorage[key] = `${value}`)
    );

    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useFactory: () => mockDocument.object }]
    });
    service = TestBed.inject(ThemeSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set theme', () => {
    it('should save choice in localStorage', () => {
      expect(mockStorage[themeKey]).toBeFalsy();

      service.setTheme(Themes.Dark);

      expect(mockStorage[themeKey]).toBe(Themes.Dark);
    });

    it('should enable theme stylesheets', () => {
      service.setTheme(Themes.Light);
      expect(mockLightSheet.disabled).toBeFalsy('Light mode is not enabled');

      service.setTheme(Themes.Dark);
      expect(mockDarkSheet.disabled).toBeFalsy('Dark mode is not enabled');
    });

    it('should enable non-theme stylesheets', () => {
      service.setTheme(Themes.Light);
      expect(mockDarkSheet.disabled).toBeTruthy('Dark mode is not disabled');

      service.setTheme(Themes.Dark);
      expect(mockLightSheet.disabled).toBeTruthy('Light mode is not disabled');
    });
  });
});
