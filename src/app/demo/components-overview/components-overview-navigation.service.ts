import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LuxThemeService } from '../../modules/lux-theme/lux-theme.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentsOverviewNavigationService implements OnDestroy {
  private currentUrl: string | null = null;
  private themeName: string;

  moduleIcons: Map<string, string> = new Map<string, string>([
    ['action', 'lux-interface-cursor-arrow-1'],
    ['common', 'lux-image-photo-composition-oval'],
    ['directive', 'lux-interface-setting-tool-box'],
    ['error', 'lux-interface-alert-warning-triangle'],
    ['filter', 'lux-interface-text-formatting-filter-1'],
    ['form', 'lux-interface-edit-write-1'],
    ['html', 'lux-interface-file-text'],
    ['icon', 'lux-image-picture-landscape-1'],
    ['layout', 'lux-interface-layout-1'],
    ['lookup', 'lux-interface-edit-binocular'],
    ['markdown', 'lux-interface-file-text'],
    ['pipes', 'lux-interface-dashboard-layout-circle'],
    ['popup', 'lux-programming-browser-window'],
    ['tenant-logo', 'lux-image-picture-landscape-1'],
    ['tour-hint', 'lux-programming-browser-window'],
    ['breadcrumb', 'lux-interface-cursor-arrow-1'],
  ]);

  private create(moduleName: string, label: string, news = false) {
    return {
      onclick: () => this.goTo(label.toLowerCase()),
      icon: this.moduleIcons.get(moduleName)!,
      label: label,
      moduleName: moduleName,
      news: news
    };
  }

  components: { onclick: any; label: string; icon: string; moduleName?: string; news: boolean }[] = [
    this.create('action', 'Button'),
    this.create('action', 'Link'),
    this.create('action', 'Link-Plain'),
    this.create('action', 'Menu'),
    this.create('common', 'Badge'),
    this.create('common', 'Message-Box'),
    this.create('common', 'Progress'),
    this.create('common', 'Spinner'),
    this.create('common', 'Table'),
    this.create('common', 'Table-Server'),
    this.create('common', 'Textbox'),
    this.create('directive', 'Badge-Notification'),
    this.create('directive', 'Infinite-Scrolling'),
    this.create('directive', 'Ripple'),
    this.create('directive', 'Tabindex'),
    this.create('directive', 'Tooltip'),
    this.create('error', 'Error-Page'),
    this.create('error', 'HTTP-Error'),
    this.create('filter', 'Filter'),
    this.create('form', 'Autocomplete-Ac'),
    this.create('form', 'Checkbox-Ac'),
    this.create('form', 'Chips-Ac'),
    this.create('form', 'Datepicker-Ac'),
    this.create('form', 'Datetimepicker-Ac'),
    this.create('form', 'File-Input-Ac'),
    this.create('form', 'File-List'),
    this.create('form', 'File-Upload'),
    this.create('form', 'Input-Ac'),
    this.create('form', 'Radio-Button-Ac'),
    this.create('form', 'Select-Ac'),
    this.create('form', 'Slider-Ac'),
    this.create('form', 'Textarea-Ac'),
    this.create('form', 'Toggle-Ac'),
    this.create('html', 'Html'),
    this.create('icon', 'Icon'),
    this.create('icon', 'Image'),
    this.create('layout', 'Accordion'),
    this.create('layout', 'App-Footer'),
    this.create('layout', 'Card'),
    this.create('layout', 'Checkbox-Container-Ac'),
    this.create('layout', 'Divider'),
    this.create('layout', 'List'),
    this.create('layout', 'Master-Detail-Ac'),
    this.create('layout', 'Stepper'),
    this.create('layout', 'Stepper-Large'),
    this.create('layout', 'Storage'),
    this.create('layout', 'Tabs'),
    this.create('layout', 'Tile'),
    this.create('layout', 'Tile-Ac'),
    this.create('lookup', 'Lookup-Autocomplete-Ac'),
    this.create('lookup', 'Lookup-Combobox-Ac'),
    this.create('lookup', 'Lookup-Label'),
    this.create('markdown', 'Markdown'),
    this.create('pipes', 'Timestamp'),
    this.create('popup', 'Dialog'),
    this.create('popup', 'Snackbar'),
    this.create('tenant-logo', 'Tenant-Logo'),
    this.create('tour-hint', 'Tour-Hint'),
    this.create('breadcrumb', 'Breadcrumb')
  ];

  sortedComponentEntries: Map<string, any[]> = new Map<string, any[]>();
  currentModules: Map<string, boolean> = new Map<string, boolean>([
    ['action', false],
    ['breadcrumb', false],
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
    ['popup', false],
    ['tenant-logo', false],
    ['tour-hint', false],
  ]);
  currentModuleNames: string[] = [];
  selectedComponent: any;
  subscriptions: Subscription[] = [];

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

  getFilteredComponents(filterValue: string) {
    return this.filteredComponents.filter((component: any) => component.label.toLowerCase().includes(filterValue.toLowerCase()));
  }

  goTo(id: string): void {
    this.router.navigate([`components-overview/example/${id}`]);
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
