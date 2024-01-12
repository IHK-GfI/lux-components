import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lux-impressum',
  templateUrl: './impressum.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImpressumComponent implements OnInit {
  public content?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.content = this.route.snapshot.data['content'];

    if (typeof this.content === 'string' && this.content.includes('<html') && this.content.includes('</html')) {
      this.content = 'In der lokalen Demo wird kein Impressum angezeigt.';
    }
  }
}
