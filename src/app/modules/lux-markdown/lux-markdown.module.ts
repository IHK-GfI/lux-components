import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxMarkdownComponent } from './lux-markdown/lux-markdown.component';
import { LuxHtmlModule } from '../lux-html/lux-html.module';

@NgModule({
  declarations: [LuxMarkdownComponent],
  imports: [CommonModule, LuxHtmlModule],
  exports: [LuxMarkdownComponent]
})
export class LuxMarkdownModule {}
