import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lookup-label-example',
  templateUrl: './lookup-label-example.component.html',
  styleUrls: ['./lookup-label-example.component.scss']
})
export class LookupLabelExampleComponent implements OnInit {
  knr = 0;
  tableKey = 4;
  tableNo = '1002';
  bezeichnung = 'kurz';
  disabled = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.disabled = false;
      this.cdr.detectChanges();
      this.knr = 101;
    }, 5000);
  }
}
