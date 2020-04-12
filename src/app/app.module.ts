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
import { PartBrowserModule } from './part-browser/part-browser.module';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './static-page/static-page.component';

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
    SharedModule,
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
