import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxHtmlComponent } from './lux-html/lux-html.component';
import { LuxSanitizePipe } from './lux-sanitize/lux-sanitize.pipe';

@NgModule({
  declarations: [LuxHtmlComponent, LuxSanitizePipe],
  imports: [CommonModule],
  exports: [LuxHtmlComponent]
})
export class LuxHtmlModule {}
