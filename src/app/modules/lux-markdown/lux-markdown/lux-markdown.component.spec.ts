import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { marked } from 'marked';

import { LuxMarkdownComponent } from './lux-markdown.component';
import { LuxHtmlModule } from '../../lux-html/lux-html.module';
import { By } from '@angular/platform-browser';
import { LuxUtil } from '../../lux-util/lux-util';

describe('LuxMarkdownComponent', () => {
  let component: LuxMarkdownComponent;
  let fixture: ComponentFixture<LuxMarkdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LuxMarkdownComponent],
      imports: [LuxHtmlModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    marked.setOptions({ headerIds: false });
    fixture = TestBed.createComponent(LuxMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('schädliche Tags sollten entfernt werden', () => {
    expect(component.luxSanitizeConfig).toBeFalsy();

    const htmlData = 'Lorem ipsum <script>alert("Unsicher!!!")</script> dolor sit amet';
    component.luxData = htmlData;
    fixture.detectChanges();

    // Die HTML-Daten sollten unverändert in die Component übernommen worden sein.
    expect(LuxUtil.stringWithoutASCIIChars(component.luxData)).toEqual('<p>' + htmlData + '</p>');

    // Gerendert werden dürfen die schädlichen Tags allerdings nicht!
    expect(
      LuxUtil.stringWithoutASCIIChars(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.innerHTML)
    ).toEqual('<p>Lorem ipsum  dolor sit amet</p>');
  });

  it('Markdown-Überschriften sollten in Html-Überschriften umgewandelt werden', () => {
    expect(component.luxData).toEqual('');

    // Teste h1
    component.luxData = '# Lorem ipsum';
    fixture.detectChanges();

    expect(LuxUtil.stringWithoutASCIIChars(component.luxData)).toEqual('<h1>Lorem ipsum</h1>');
    expect(
      LuxUtil.stringWithoutASCIIChars(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.innerHTML)
    ).toEqual('<h1>Lorem ipsum</h1>');

    // Teste h2
    component.luxData = '## Lorem ipsum';
    fixture.detectChanges();

    expect(LuxUtil.stringWithoutASCIIChars(component.luxData)).toEqual('<h2>Lorem ipsum</h2>');
    expect(
      LuxUtil.stringWithoutASCIIChars(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.innerHTML)
    ).toEqual('<h2>Lorem ipsum</h2>');

    // Teste h3
    component.luxData = '### Lorem ipsum';
    fixture.detectChanges();

    expect(LuxUtil.stringWithoutASCIIChars(component.luxData)).toEqual('<h3>Lorem ipsum</h3>');
    expect(
      LuxUtil.stringWithoutASCIIChars(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.innerHTML)
    ).toEqual('<h3>Lorem ipsum</h3>');

    // Teste h4
    component.luxData = '#### Lorem ipsum';
    fixture.detectChanges();

    expect(LuxUtil.stringWithoutASCIIChars(component.luxData)).toEqual('<h4>Lorem ipsum</h4>');
    expect(
      LuxUtil.stringWithoutASCIIChars(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.innerHTML)
    ).toEqual('<h4>Lorem ipsum</h4>');
  });

  it('Markdown-Links sollten in Html-Links umgewandelt werden', () => {
    expect(component.luxData).toEqual('');

    component.luxData = '[IHK-GfI](https://www.ihk-gfi.de)';
    fixture.detectChanges();

    expect(LuxUtil.stringWithoutASCIIChars(component.luxData)).toEqual(
      '<p><a href="https://www.ihk-gfi.de">IHK-GfI</a></p>'
    );
    expect(
      LuxUtil.stringWithoutASCIIChars(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.innerHTML)
    ).toEqual('<p><a href="https://www.ihk-gfi.de">IHK-GfI</a></p>');
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
    expect(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.style.color).toEqual('blue');
    expect(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.style.backgroundColor).toEqual('red');
  });

  it('luxClass muss gesetzt sein', () => {
    expect(component.luxClass).toEqual('');

    component.luxClass = 'my-class-1 my-class-2';
    fixture.detectChanges();

    expect(component.luxClass).toEqual('my-class-1 my-class-2');
    expect(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.classList).toContain('my-class-1');
    expect(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.classList).toContain('my-class-2');
    expect(fixture.debugElement.query(By.css('lux-html > div')).nativeElement.classList).not.toContain(
      'my-class-not-found2'
    );
  });
});
