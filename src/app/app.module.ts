import { ENV_PROVIDERS } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ErrorComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [ENV_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {}
