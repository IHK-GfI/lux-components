import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxMarkdownComponent } from './lux-markdown/lux-markdown.component';
import { LuxHtmlModule } from '../lux-html/lux-html.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LuxMarkdownComponent],
  imports: [CommonModule, FlexLayoutModule, LuxHtmlModule],
  exports: [LuxMarkdownComponent]
})
export class LuxMarkdownModule {}
