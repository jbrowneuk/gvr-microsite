import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PartSummaryComponent } from './part-summary/part-summary.component';
import { PartBrowserEffects } from './state/part-browser.effects';
import { partBrowserReducer } from './state/part-browser.reducer';
import { partBrowserFeatureName } from './state/part-browser.selectors';

const routes: Routes = [{ path: 'parts', component: PartSummaryComponent }];

@NgModule({
  declarations: [PartSummaryComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(partBrowserFeatureName, partBrowserReducer),
    EffectsModule.forFeature([PartBrowserEffects]),
    RouterModule.forChild(routes)
  ]
})
export class PartBrowserModule {}
