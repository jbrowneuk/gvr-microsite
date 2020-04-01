import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostSingleComponent } from './post-single/post-single.component';
import { PostComponent } from './post/post.component';
import { JournalEffects } from './state/journal.effects';
import { journalReducer } from './state/journal.reducer';
import { journalFeatureName } from './state/journal.selectors';

const routes = [
  { path: 'journal', redirectTo: 'journal/page/1', pathMatch: 'full' },
  { path: 'journal/page/:page', component: PostListComponent },
  { path: 'journal/post/:slug', component: PostSingleComponent }
];

@NgModule({
  declarations: [PostComponent, PostListComponent, PostSingleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(journalFeatureName, journalReducer),
    EffectsModule.forFeature([JournalEffects]),
    SharedModule
  ]
})
export class JournalModule {}
