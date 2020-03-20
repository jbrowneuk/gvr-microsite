import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PartBrowserEffects } from './state/part-browser.effects';
import { partBrowserReducer } from './state/part-browser.reducer';
import { partBrowserFeatureName } from './state/part-browser.selectors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(partBrowserFeatureName, partBrowserReducer),
    EffectsModule.forFeature([PartBrowserEffects])
  ]
})
export class PartBrowserModule {}
