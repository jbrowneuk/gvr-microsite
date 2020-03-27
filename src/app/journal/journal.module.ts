import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { JournalEffects } from './state/journal.effects';
import { journalReducer } from './state/journal.reducer';
import { journalFeatureName } from './state/journal.selectors';

@NgModule({
  declarations: [PostComponent, PostListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(journalFeatureName, journalReducer),
    EffectsModule.forFeature([JournalEffects]),
    SharedModule
  ]
})
export class JournalModule {}
