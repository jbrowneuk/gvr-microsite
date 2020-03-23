import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataExtractionPipe } from './data-extraction.pipe';
import { DataFilterPipe } from './data-filter.pipe';
import { FormatKeyPipe } from './format-key.pipe';
import { FormatValuePipe } from './format-value.pipe';
import { TableClassPipe } from './table-class.pipe';

@NgModule({
  declarations: [
    DataExtractionPipe,
    DataFilterPipe,
    FormatKeyPipe,
    FormatValuePipe,
    TableClassPipe
  ],
  imports: [CommonModule]
})
export class SharedModule {}
