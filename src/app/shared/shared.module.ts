import { NgxMdModule } from 'ngx-md';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataExtractionPipe } from './data-extraction.pipe';
import { DataFilterPipe } from './data-filter.pipe';
import { FormatKeyPipe } from './format-key.pipe';
import { FormatValuePipe } from './format-value.pipe';
import { FormattedTextComponent } from './formatted-text/formatted-text.component';
import { TableClassPipe } from './table-class.pipe';
import { UnixEpochPipe } from './unix-epoch.pipe';

const sharedFeatures = [
  DataExtractionPipe,
  DataFilterPipe,
  FormatKeyPipe,
  FormatValuePipe,
  FormattedTextComponent,
  TableClassPipe,
  UnixEpochPipe
];

@NgModule({
  declarations: sharedFeatures,
  imports: [CommonModule, NgxMdModule.forRoot()],
  exports: sharedFeatures
})
export class SharedModule {}
