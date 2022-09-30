import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LuxSnackbarService } from '../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentsOverviewNavigationService implements OnDestroy {
  private currentUrl: string | null = null;

  components: { onclick: any; label: string; icon: string; useImage?: boolean; moduleName?: string; news?: boolean }[] = [
    { onclick: () => this.goTo('accordion'), icon: 'fas fa-stream', label: 'Accordion', moduleName: 'layout', news: true },
    { onclick: () => this.goTo('autocomplete'), icon: 'fas fa-font', label: 'Autocomplete', moduleName: 'form' },
    { onclick: () => this.goTo('autocomplete-ac'), icon: 'fas fa-font', label: 'Autocomplete-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('badge'), icon: 'fas fa-ribbon', label: 'Badge', moduleName: 'common' },
    { onclick: () => this.goTo('button'), icon: 'fas fa-bullseye', label: 'Button', moduleName: 'action', news: true },
    { onclick: () => this.goTo('card'), icon: 'lux-interface-geometric-square', label: 'Card', moduleName: 'layout' },
    { onclick: () => this.goTo('chips'), icon: 'fas fa-ship', label: 'Chips', moduleName: 'form' },
    { onclick: () => this.goTo('chips-ac'), icon: 'fas fa-ship', label: 'Chips-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('datepicker'), icon: 'fas fa-calendar-day', label: 'Datepicker', moduleName: 'form' },
    { onclick: () => this.goTo('datepicker-ac'), icon: 'fas fa-calendar-day', label: 'Datepicker-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('datetimepicker'), icon: 'fas fa-calendar-day', label: 'Datetimepicker', moduleName: 'form' },
    { onclick: () => this.goTo('datetimepicker-ac'), icon: 'fas fa-calendar-day', label: 'Datetimepicker-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('divider'), icon: 'fas fa-divide', label: 'Divider', moduleName: 'layout' },
    {
      onclick: () => this.goTo('error-page'),
      icon: 'lux-interface-alert-warning-circle',
      label: 'Error-Page',
      moduleName: 'error'
    },
    { onclick: () => this.goTo('http-error'), icon: 'fas fa-server', label: 'HTTP-Error', moduleName: 'error' },
    { onclick: () => this.goTo('icon'), icon: 'fas fa-image', label: 'Icon', moduleName: 'icon' },
    { onclick: () => this.goTo('image'), icon: 'fas fa-camera', label: 'Image', moduleName: 'icon' },
    { onclick: () => this.goTo('link'), icon: 'fas fa-link', label: 'Link', moduleName: 'action' },
    { onclick: () => this.goTo('progress'), icon: 'fas fa-battery-half', label: 'Progress', moduleName: 'common' },
    { onclick: () => this.goTo('radio-button'), icon: 'fas fa-circle', label: 'Radio-Button', moduleName: 'form' },
    { onclick: () => this.goTo('radio-button-ac'), icon: 'fas fa-circle', label: 'Radio-Button-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('select'), icon: 'fab fa-get-pocket', label: 'Select', moduleName: 'form' },
    { onclick: () => this.goTo('select-ac'), icon: 'fab fa-get-pocket', label: 'Select-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('slider'), icon: 'fas fa-sliders-h', label: 'Slider', moduleName: 'form' },
    { onclick: () => this.goTo('slider-ac'), icon: 'fas fa-sliders-h', label: 'Slider-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('snackbar'), icon: 'lux-interface-edit-view', label: 'Snackbar', moduleName: 'popup' },
    { onclick: () => this.goTo('spinner'), icon: 'fas fa-spinner', label: 'Spinner', moduleName: 'common' },
    { onclick: () => this.goTo('storage'), icon: 'fas fa-hdd', label: 'Storage', moduleName: 'layout' },
    { onclick: () => this.goTo('table'), icon: 'fas fa-table', label: 'Table', moduleName: 'common', news: true },
    { onclick: () => this.goTo('table-server'), icon: 'fas fa-table', label: 'Table-Server', moduleName: 'common' },
    { onclick: () => this.goTo('textarea'), icon: 'fas fa-text-height', label: 'Textarea', moduleName: 'form' },
    { onclick: () => this.goTo('textarea-ac'), icon: 'fas fa-text-height', label: 'Textarea-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('tooltip'), icon: 'fas fa-mouse-pointer', label: 'Tooltip', moduleName: 'directive' },
    {
      onclick: () => this.goTo('lookup-combobox'),
      icon: 'fas fa-binoculars',
      label: 'Lookup-Combobox',
      moduleName: 'lookup'
    },
    {
      onclick: () => this.goTo('lookup-autocomplete'),
      icon: 'fas fa-binoculars',
      label: 'Lookup-Autocomplete',
      moduleName: 'lookup'
    },
    {
      onclick: () => this.goTo('lookup-combobox-ac'),
      icon: 'fas fa-binoculars',
      label: 'Lookup-Combobox-Ac',
      moduleName: 'lookup',
      news: true
    },
    {
      onclick: () => this.goTo('lookup-autocomplete-ac'),
      icon: 'fas fa-binoculars',
      label: 'Lookup-Autocomplete-Ac',
      moduleName: 'lookup',
      news: true
    },
    {
      onclick: () => this.goTo('lookup-label'),
      icon: 'fas fa-binoculars',
      label: 'Lookup-Label',
      moduleName: 'lookup'
    },
    { onclick: () => this.goTo('input'), icon: 'fas fa-text-width', label: 'Input', moduleName: 'form' },
    {
      onclick: () => this.goTo('tabindex'),
      icon: 'fas fa-sort-numeric-down',
      label: 'Tabindex',
      moduleName: 'directive'
    },
    { onclick: () => this.goTo('tile'), icon: 'fas fa-qrcode', label: 'Tile', moduleName: 'layout' },
    { onclick: () => this.goTo('message-box'), icon: 'fas fa-comments', label: 'Message-Box', moduleName: 'common', news: true },
    { onclick: () => this.goTo('checkbox'), icon: 'lux-interface-validation-check-square-1', label: 'Checkbox', moduleName: 'form'},
    { onclick: () => this.goTo('checkbox-ac'), icon: 'lux-interface-validation-check-square-1', label: 'Checkbox-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('menu'), icon: 'lux-interface-setting-menu-vertical', label: 'Menu', moduleName: 'action' },
    { onclick: () => this.goTo('app-footer'), icon: 'fas fa-shoe-prints', label: 'App-Footer', moduleName: 'layout' },
    { onclick: () => this.goTo('toggle'), icon: 'fas fa-toggle-on', label: 'Toggle', moduleName: 'form' },
    { onclick: () => this.goTo('toggle-ac'), icon: 'fas fa-toggle-on', label: 'Toggle-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('list'), icon: 'fas lux-interface-text-formatting-list-bullets-ul', label: 'List', moduleName: 'layout' },
    { onclick: () => this.goToMasterDetail(), icon: 'fas fa-th-list', label: 'Master-Detail', moduleName: 'layout' },
    { onclick: () => this.goToTabs(), icon: 'fas fa-columns', label: 'Tabs', moduleName: 'layout', news: true },
    { onclick: () => this.goToStepper(), icon: 'fas fa-chevron-circle-right', label: 'Stepper', moduleName: 'layout', news: true },
    { onclick: () => this.goTo('stepper-large'), icon: 'fas fa-chevron-circle-right', label: 'Stepper-Large', moduleName: 'layout', news: true },
    { onclick: () => this.goTo('timestamp'), icon: 'fas fa-clock', label: 'Timestamp', moduleName: 'pipes' },
    {
      onclick: () => this.goTo('infinite-scrolling'),
      icon: 'fas fa-long-arrow-alt-down',
      label: 'Infinite-Scrolling',
      moduleName: 'directive'
    },
    { onclick: () => this.goTo('dialog'), icon: 'fas fa-question-circle', label: 'Dialog', moduleName: 'popup', news: true },
    {
      onclick: () => this.goTo('file-input'),
      icon: 'fas fa-cloud-upload-alt',
      label: 'File-Input',
      moduleName: 'form'
    },
    {
      onclick: () => this.goTo('file-input-ac'), icon: 'fas fa-cloud-upload-alt',
      label: 'File-Input-Ac',
      moduleName: 'form',
      news: true
    },
    { onclick: () => this.goTo('file-list'), icon: 'fas fa-cloud-upload-alt', label: 'File-List', moduleName: 'form' },
    { onclick: () => this.goTo('file-upload'), icon: 'fas fa-cloud-upload-alt', label: 'File-Upload', moduleName: 'form' },
    { onclick: () => this.goTo('ripple'), icon: 'fas fa-water', label: 'Ripple', moduleName: 'directive' },
    {
      onclick: () => this.goTo('badge-notification'),
      icon: 'fas fa-bell',
      label: 'Badge-Notification',
      moduleName: 'directive',
      news: true
    },
    { onclick: () => this.goTo('html'), icon: 'fab fa-html5', label: 'Html', moduleName: 'html' },
    { onclick: () => this.goTo('markdown'), icon: 'fab fa-markdown', label: 'Markdown', moduleName: 'markdown' },
    { onclick: () => this.goTo('form-row'), icon: 'fas fa-grip-horizontal', label: 'Form-Row', moduleName: 'layout' },
    { onclick: () => this.goTo('card-row'), icon: 'fas fa-grip-horizontal', label: 'Card-Row', moduleName: 'layout' },
    { onclick: () => this.goTo('filter'), icon: 'fas fa-filter', label: 'Filter', moduleName: 'filter', news: true },
    { onclick: () => this.goTo('link-plain'), icon: 'fas fa-globe', label: 'Link-Plain', moduleName: 'action', news: true },
    { onclick: () => this.goTo('tile-ac'), icon: 'fas fa-dove', label: 'Tile-Ac', moduleName: 'layout', news: true },
    { onclick: () => this.goTo('input-ac'), icon: 'fas fa-water', label: 'Input-Ac', moduleName: 'form', news: true },
    { onclick: () => this.goTo('master-detail-light'), icon: 'fas fa-globe', label: 'Master-Detail-Light', moduleName: 'layout', news: true }
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
  subscription: Subscription;
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

  constructor(private router: Router, private snackbar: LuxSnackbarService) {
    this.currentModuleNames = Array.from(this.currentModules.keys());
    this.sortComponentEntriesByModule();

    this.subscription = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((url: NavigationEnd) => {
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
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  openSnackbar() {
    this.snackbar.open(5000, {
      text: 'Diese Kachel zeigt nur ein Bild und kein Icon an. Es wird auch nicht irgendwohin gesprungen.',
      iconName: 'fa-info-circle'
    });
  }

  sortComponentEntriesByModule() {
    this.currentModuleNames.forEach((moduleName: string) => {
      this.sortedComponentEntries.set(
        moduleName,
        this.components.filter((component: any) => component.moduleName === moduleName)
      );
    });
  }
}
