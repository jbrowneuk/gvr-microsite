import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataExtractionPipe } from './data-extraction.pipe';
import { DataFilterPipe } from './data-filter.pipe';

@NgModule({
  declarations: [DataExtractionPipe, DataFilterPipe],
  imports: [CommonModule]
})
export class SharedModule {}
