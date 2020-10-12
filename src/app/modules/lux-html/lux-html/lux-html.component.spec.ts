import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxHtmlComponent } from './lux-html.component';
import { LuxHtmlModule } from '../lux-html.module';
import { By } from '@angular/platform-browser';

describe('LuxHtmlComponent', () => {
  let component: LuxHtmlComponent;
  let fixture: ComponentFixture<LuxHtmlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LuxHtmlComponent],
      imports: [LuxHtmlModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('schädliche Tags sollten auch ohne SanitizeConfig entfernt werden', () => {
    expect(component.luxSanitizeConfig).toBeFalsy();

    const htmlData = '<p>Lorem ipsum <script>alert("Unsicher!!!")</script> dolor sit amet</p>';
    component.luxData = htmlData;
    fixture.detectChanges();

    // Die HTML-Daten sollten unverändert in die Component übernommen worden sein.
    expect(component.luxData).toEqual(htmlData);

    // Gerendert werden dürfen die schädlichen Tags allerdings nicht!
    expect((fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement).innerHTML).toEqual(
      '<p>Lorem ipsum  dolor sit amet</p>'
    );
  });

  it('nur p-Tags sind erlaubt', () => {
    expect(component.luxSanitizeConfig).toBeFalsy();

    const htmlData = '<p>Lorem <b>ipsum</b> <script>alert("Unsicher!!!")</script> dolor sit amet</p>';
    component.luxData = htmlData;
    component.luxSanitizeConfig = { allowedTags: ['p'] };
    fixture.detectChanges();

    // Die HTML-Daten sollten unverändert in die Component übernommen worden sein.
    expect(component.luxData).toEqual(htmlData);

    // Gerendert werden dürfen die schädlichen Tags allerdings nicht!
    expect((fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement).innerHTML).toEqual(
      '<p>Lorem ipsum  dolor sit amet</p>'
    );
  });

  it('luxFlex muss gesetzt sein', () => {
    expect(component.luxFlex).toEqual('flex');

    component.luxFlex = '1 1 auto';
    fixture.detectChanges();

    expect(component.luxFlex).toEqual('1 1 auto');
  });

  it('luxStyle muss gesetzt sein', () => {
    expect(component.luxStyle).toEqual('');

    component.luxStyle = 'color: blue; background-color: red';
    fixture.detectChanges();

    expect(component.luxStyle).toEqual('color: blue; background-color: red');
    expect(fixture.debugElement.query(By.css('div')).styles['color']).toEqual('blue');
    expect(fixture.debugElement.query(By.css('div')).styles['background-color']).toEqual('red');
  });

  it('luxClass muss gesetzt sein', () => {
    expect(component.luxClass).toEqual('');

    component.luxClass = 'my-class-1 my-class-2';
    fixture.detectChanges();

    expect(component.luxClass).toEqual('my-class-1 my-class-2');
    expect(fixture.debugElement.query(By.css('div')).classes['my-class-1']).toBeTrue();
    expect(fixture.debugElement.query(By.css('div')).classes['my-class-2']).toBeTrue();
    expect(fixture.debugElement.query(By.css('div')).classes['my-class-not-found2']).toBeFalsy();
  });
});
