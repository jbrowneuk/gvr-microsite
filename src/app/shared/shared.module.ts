import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataExtractionPipe } from './data-extraction.pipe';

@NgModule({
  declarations: [DataExtractionPipe],
  imports: [CommonModule]
})
export class SharedModule {}
