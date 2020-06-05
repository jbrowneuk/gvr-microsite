import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export const themeKey = 'selectedTheme';

export enum Themes {
  Light = 'Default',
  Dark = 'Dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.updateThemeSelection();
  }

  public setTheme(styleSheet: Themes): void {
    localStorage.setItem(themeKey, styleSheet);

    this.updateThemeSelection();
  }

  private updateThemeSelection(): void {
    const validSheets = Array.from(
      this.document.querySelectorAll('link[rel*=stylesheet][title]')
    ) as HTMLLinkElement[];

    const currentTheme = this.getStoredTheme();

    validSheets.forEach(sheet => {
      sheet.disabled = !sheet.title.includes(currentTheme);
    });
  }

  private getStoredTheme(): Themes {
    const storedValue = localStorage.getItem(themeKey);
    if (!storedValue) {
      return this.calculateDefaultTheme();
    }

    const parsedTheme = Object.values(Themes).find(t => t === storedValue);
    return parsedTheme || this.calculateDefaultTheme();
  }

  private calculateDefaultTheme(): Themes {
    const hour = new Date().getHours();
    return hour > 6 && hour < 18 ? Themes.Light : Themes.Dark;
  }
}
