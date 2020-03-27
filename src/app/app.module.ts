import { ENV_PROVIDERS, environment } from 'src/environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { JournalModule } from './journal/journal.module';
import { LayoutComponent } from './layout/layout.component';
import { PartBrowserModule } from './part-browser/part-browser.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, ErrorComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Railway browser DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    PartBrowserModule,
    JournalModule,
    AppRoutingModule
  ],
  providers: [
    ENV_PROVIDERS,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'GBP' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
