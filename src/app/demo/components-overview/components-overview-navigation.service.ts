import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LuxThemeService } from '../../modules/lux-theme/lux-theme.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentsOverviewNavigationService implements OnDestroy {
  private readonly themeArrAC = ['authentic'];
  private readonly themeArrBG = ['blue', 'green'];

  private currentUrl: string | null = null;
  private themeName: string;

  components: { onclick: any; label: string; icon: string; useImage?: boolean; moduleName?: string; news?: boolean; themes?: string[] }[] =
    [
      { onclick: () => this.goTo('accordion'), icon: 'lux-interface-layout-2', label: 'Accordion', moduleName: 'layout', news: true },
      {
        onclick: () => this.goTo('autocomplete'),
        icon: 'lux-interface-text-formatting-font-size',
        label: 'Autocomplete',
        moduleName: 'form',
        themes: this.themeArrBG
      },
      {
        onclick: () => this.goTo('autocomplete-ac'),
        icon: 'fas fa-font',
        label: 'Autocomplete-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('badge'), icon: 'lux-atom', label: 'Badge', moduleName: 'common' },
      { onclick: () => this.goTo('button'), icon: 'lux-running', label: 'Button', moduleName: 'action', news: true },
      { onclick: () => this.goTo('card'), icon: 'lux-interface-layout-2', label: 'Card', moduleName: 'layout' },
      { onclick: () => this.goTo('chips'), icon: 'lux-interface-file-text', label: 'Chips', moduleName: 'form', themes: this.themeArrBG },
      {
        onclick: () => this.goTo('chips-ac'),
        icon: 'fas fa-ship',
        label: 'Chips-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      {
        onclick: () => this.goTo('datepicker'),
        icon: 'lux-interface-file-text',
        label: 'Datepicker',
        moduleName: 'form',
        themes: this.themeArrBG
      },
      {
        onclick: () => this.goTo('datepicker-ac'),
        icon: 'fas fa-calendar-day',
        label: 'Datepicker-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      {
        onclick: () => this.goTo('datetimepicker'),
        icon: 'lux-interface-file-text',
        label: 'Datetimepicker',
        moduleName: 'form',
        themes: this.themeArrBG
      },
      {
        onclick: () => this.goTo('datetimepicker-ac'),
        icon: 'fas fa-calendar-day',
        label: 'Datetimepicker-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('divider'), icon: 'lux-interface-layout-2', label: 'Divider', moduleName: 'layout' },
      { onclick: () => this.goTo('error-page'), icon: 'lux-interface-alert-warning-circle', label: 'Error-Page', moduleName: 'error' },
      { onclick: () => this.goTo('http-error'), icon: 'lux-interface-alert-radio-active-1', label: 'HTTP-Error', moduleName: 'error' },
      { onclick: () => this.goTo('icon'), icon: 'lux-image-picture-landscape-2', label: 'Icon', moduleName: 'icon' },
      { onclick: () => this.goTo('image'), icon: 'lux-image-picture-landscape-1', label: 'Image', moduleName: 'icon' },
      { onclick: () => this.goTo('link'), icon: 'lux-interface-link', label: 'Link', moduleName: 'action' },
      { onclick: () => this.goTo('progress'), icon: 'lux-atom', label: 'Progress', moduleName: 'common' },
      {
        onclick: () => this.goTo('radio-button'),
        icon: 'lux-interface-geometric-circle',
        label: 'Radio-Button',
        moduleName: 'form',
        themes: this.themeArrBG
      },
      {
        onclick: () => this.goTo('radio-button-ac'),
        icon: 'fas fa-circle',
        label: 'Radio-Button-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('select'), icon: 'lux-interface-file-text', label: 'Select', moduleName: 'form', themes: this.themeArrBG },
      {
        onclick: () => this.goTo('select-ac'),
        icon: 'fab fa-get-pocket',
        label: 'Select-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      {
        onclick: () => this.goTo('slider'),
        icon: 'lux-interface-setting-slider-horizontal',
        label: 'Slider',
        moduleName: 'form',
        themes: this.themeArrBG
      },
      {
        onclick: () => this.goTo('slider-ac'),
        icon: 'fas fa-sliders-h',
        label: 'Slider-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('snackbar'), icon: 'lux-interface-edit-view', label: 'Snackbar', moduleName: 'popup' },
      { onclick: () => this.goTo('spinner'), icon: 'lux-spinner', label: 'Spinner', moduleName: 'common' },
      { onclick: () => this.goTo('storage'), icon: 'lux-interface-layout-2', label: 'Storage', moduleName: 'layout' },
      { onclick: () => this.goTo('table'), icon: 'lux-interface-layout-7', label: 'Table', moduleName: 'common', news: true },
      { onclick: () => this.goTo('table-server'), icon: 'lux-atom', label: 'Table-Server', moduleName: 'common' },
      {
        onclick: () => this.goTo('textarea'),
        icon: 'lux-interface-file-text',
        label: 'Textarea',
        moduleName: 'form',
        themes: this.themeArrBG
      },
      {
        onclick: () => this.goTo('textarea-ac'),
        icon: 'fas fa-text-height',
        label: 'Textarea-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('tooltip'), icon: 'lux-interface-cursor-arrow-1', label: 'Tooltip', moduleName: 'directive' },
      {
        onclick: () => this.goTo('lookup-combobox'),
        icon: 'lux-interface-edit-binocular',
        label: 'Lookup-Combobox',
        moduleName: 'lookup',
        themes: this.themeArrBG
      },
      {
        onclick: () => this.goTo('lookup-combobox-ac'),
        icon: 'fas fa-binoculars',
        label: 'Lookup-Combobox-Ac',
        moduleName: 'lookup',
        news: true,
        themes: this.themeArrAC
      },
      {
        onclick: () => this.goTo('lookup-autocomplete'),
        icon: 'lux-interface-edit-binocular',
        label: 'Lookup-Autocomplete',
        moduleName: 'lookup',
        themes: this.themeArrBG
      },
      {
        onclick: () => this.goTo('lookup-autocomplete-ac'),
        icon: 'fas fa-binoculars',
        label: 'Lookup-Autocomplete-Ac',
        moduleName: 'lookup',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('lookup-label'), icon: 'lux-interface-edit-binocular', label: 'Lookup-Label', moduleName: 'lookup' },
      { onclick: () => this.goTo('input'), icon: 'lux-interface-file-text', label: 'Input', moduleName: 'form', themes: this.themeArrBG },
      {
        onclick: () => this.goTo('input-ac'),
        icon: 'fas fa-water',
        label: 'Input-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('tabindex'), icon: 'lux-interface-alert-warning-circle', label: 'Tabindex', moduleName: 'directive' },
      { onclick: () => this.goTo('tile'), icon: 'lux-interface-layout-2', label: 'Tile', moduleName: 'layout', themes: this.themeArrBG },
      {
        onclick: () => this.goTo('tile-ac'),
        icon: 'fas fa-dove',
        label: 'Tile-Ac',
        moduleName: 'layout',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('message-box'), icon: 'lux-ovals', label: 'Message-Box', moduleName: 'common', news: true },
      {
        onclick: () => this.goTo('checkbox'),
        icon: 'lux-interface-validation-check-square-1',
        label: 'Checkbox',
        moduleName: 'form',
        themes: this.themeArrBG
      },
      {
        onclick: () => this.goTo('checkbox-ac'),
        icon: 'fas fa-check-square',
        label: 'Checkbox-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('menu'), icon: 'lux-interface-setting-menu-vertical', label: 'Menu', moduleName: 'action' },
      { onclick: () => this.goTo('app-footer'), icon: 'lux-interface-layout-2', label: 'App-Footer', moduleName: 'layout' },
      { onclick: () => this.goTo('toggle'), icon: 'lux-interface-file-text', label: 'Toggle', moduleName: 'form', themes: this.themeArrBG },
      {
        onclick: () => this.goTo('toggle-ac'),
        icon: 'fas fa-toggle-on',
        label: 'Toggle-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('list'), icon: 'lux-interface-text-formatting-list-bullets', label: 'List', moduleName: 'layout' },
      {
        onclick: () => this.goToMasterDetail(),
        icon: 'lux-interface-layout-2',
        label: 'Master-Detail',
        moduleName: 'layout',
        themes: this.themeArrBG
      },
      { onclick: () => this.goToTabs(), icon: 'lux-interface-layout-three-columns', label: 'Tabs', moduleName: 'layout', news: true },
      { onclick: () => this.goToStepper(), icon: 'lux-interface-layout-2', label: 'Stepper', moduleName: 'layout', news: true },
      {
        onclick: () => this.goTo('stepper-large'),
        icon: 'lux-interface-layout-2',
        label: 'Stepper-Large',
        moduleName: 'layout',
        news: true
      },
      { onclick: () => this.goTo('timestamp'), icon: 'lux-interface-time-clock-circle', label: 'Timestamp', moduleName: 'pipes' },
      {
        onclick: () => this.goTo('infinite-scrolling'),
        icon: 'lux-interface-alert-warning-circle',
        label: 'Infinite-Scrolling',
        moduleName: 'directive'
      },
      { onclick: () => this.goTo('dialog'), icon: 'lux-interface-help-question-circle', label: 'Dialog', moduleName: 'popup', news: true },
      {
        onclick: () => this.goTo('file-input'),
        icon: 'lux-programming-cloud-upload',
        label: 'File-Input',
        moduleName: 'form',
        themes: this.themeArrBG
      },
      {
        onclick: () => this.goTo('file-input-ac'),
        icon: 'fas fa-cloud-upload-alt',
        label: 'File-Input-Ac',
        moduleName: 'form',
        news: true,
        themes: this.themeArrAC
      },
      { onclick: () => this.goTo('file-list'), icon: 'lux-programming-cloud-upload', label: 'File-List', moduleName: 'form' },
      { onclick: () => this.goTo('file-upload'), icon: 'lux-programming-cloud-upload', label: 'File-Upload', moduleName: 'form' },
      { onclick: () => this.goTo('ripple'), icon: 'lux-interface-alert-warning-circle', label: 'Ripple', moduleName: 'directive' },
      {
        onclick: () => this.goTo('badge-notification'),
        icon: 'lux-interface-alert-alarm-bell-2',
        label: 'Badge-Notification',
        moduleName: 'directive',
        news: true
      },
      { onclick: () => this.goTo('html'), icon: 'lux-interface-security-shield-4', label: 'Html', moduleName: 'html' },
      { onclick: () => this.goTo('markdown'), icon: 'lux-interface-edit-pencil', label: 'Markdown', moduleName: 'markdown' },
      { onclick: () => this.goTo('form-row'), icon: 'lux-dial-pad-6-digits', label: 'Form-Row', moduleName: 'layout' },
      { onclick: () => this.goTo('card-row'), icon: 'lux-dial-pad-6-digits', label: 'Card-Row', moduleName: 'layout' },
      {
        onclick: () => this.goTo('filter'),
        icon: 'lux-interface-text-formatting-filter-1',
        label: 'Filter',
        moduleName: 'filter',
        news: true
      },
      { onclick: () => this.goTo('link-plain'), icon: 'lux-programming-web', label: 'Link-Plain', moduleName: 'action', news: true },
      {
        onclick: () => this.goTo('master-detail-ac'),
        icon: 'fas fa-globe',
        label: 'Master-Detail-Ac',
        moduleName: 'layout',
        news: true,
        themes: this.themeArrAC
      },
      {
        onclick: () => this.goTo('checkbox-container-ac'),
        icon: '',
        label: 'Checkbox-Container-Ac',
        moduleName: 'layout',
        news: true,
        themes: this.themeArrAC
      }
    ];

  sortedComponentEntries: Map<string, any[]> = new Map<string, any[]>();
  currentModules: Map<string, boolean> = new Map<string, boolean>([
    ['action', false],
    ['common', false],
    ['directive', false],
    ['error', false],
    ['filter', false],
    ['form', false],
    ['html', false],
    ['icon', false],
    ['layout', false],
    ['lookup', false],
    ['markdown', false],
    ['pipes', false],
    ['popup', false]
  ]);
  currentModuleNames: string[] = [];
  selectedComponent: any;
  subscriptions: Subscription[] = [];
  moduleIcons: Map<string, string> = new Map<string, string>([
    ['action', 'lux-running'],
    ['common', 'lux-atom'],
    ['directive', 'lux-interface-alert-warning-circle'],
    ['error', 'lux-interface-alert-radio-active-1'],
    ['filter', 'lux-interface-text-formatting-filter-1'],
    ['form', 'lux-interface-file-text'],
    ['html', 'lux-interface-security-shield-4'],
    ['icon', 'lux-image-picture-landscape-1'],
    ['layout', 'lux-interface-layout-2'],
    ['lookup', 'lux-interface-edit-binocular'],
    ['markdown', 'lux-interface-edit-pencil'],
    ['pipes', 'lux-recording-tape-2'],
    ['popup', 'lux-interface-align-layers-2']
  ]);

  constructor(private themeService: LuxThemeService, private router: Router) {
    this.themeName = this.themeService.getTheme().name;
    this.subscriptions.push(
      this.themeService.getThemeAsObservable().subscribe((theme) => {
        this.themeName = theme.name;
        this.sortComponentEntriesByModule();
      })
    );

    this.currentModuleNames = Array.from(this.currentModules.keys());
    this.sortComponentEntriesByModule();

    this.subscriptions.push(
      this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe((url: NavigationEnd) => {
        this.currentUrl = url.url;
        const urlPaths = this.currentUrl.split('/');
        const lastPath = urlPaths && urlPaths[urlPaths.length - 1] ? urlPaths[urlPaths.length - 1] : '';
        for (const component of this.components) {
          if (lastPath.toLowerCase() === component.label.toLowerCase()) {
            this.selectedComponent = component;
            // Alle Modules als expanded=false markieren, Ausnahme: das Modul des aktuellen Beispiels
            this.currentModules.forEach((expanded: boolean, moduleName: string) =>
              this.currentModules.set(moduleName, moduleName === component.moduleName)
            );
            break;
          } else {
            this.selectedComponent = null;
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  get filteredComponents() {
    return this.components.filter(
      (component: any) => !component.themes || !!component.themes.find((theme: string) => theme === this.themeName)
    );
  }

  goTo(id: string): void {
    this.router.navigate([`components-overview/example/${id}`]);
  }

  goToMasterDetail() {
    this.router.navigate(['components-overview/example/master-detail']);
  }

  goToTabs() {
    this.router.navigate(['components-overview/example/tabs']);
  }

  goToStepper() {
    this.router.navigate(['components-overview/example/stepper']);
  }

  onExpandAll() {
    this.currentModules.forEach((expanded: boolean, moduleName: string) => this.currentModules.set(moduleName, true));
  }

  onCollapseAll() {
    this.currentModules.forEach((expanded: boolean, moduleName: string) => this.currentModules.set(moduleName, false));
  }

  sortComponentEntriesByModule() {
    this.currentModuleNames.forEach((moduleName: string) => {
      this.sortedComponentEntries.set(
        moduleName,
        this.components.filter(
          (component: any) =>
            component.moduleName === moduleName &&
            (!component.themes || !!component.themes.find((theme: string) => theme === this.themeName))
        )
      );
    });
  }
}
