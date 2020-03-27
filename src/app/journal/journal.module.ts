import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { JournalEffects } from './state/journal.effects';
import { journalReducer } from './state/journal.reducer';
import { journalFeatureName } from './state/journal.selectors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(journalFeatureName, journalReducer),
    EffectsModule.forFeature([JournalEffects])
  ]
})
export class JournalModule {}
