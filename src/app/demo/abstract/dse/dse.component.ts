import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lux-dse',
  templateUrl: './dse.component.html',
  styles: [':host { display: flex; justify-content: center}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DseComponent implements OnInit {
  public content?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.content = this.route.snapshot.data['content'];

    if (typeof this.content === 'string' && this.content.includes('<html') && this.content.includes('</html')) {
      this.content = 'In der lokalen Demo wird kein Datenschutzhinweis angezeigt.';
    }
  }
}
