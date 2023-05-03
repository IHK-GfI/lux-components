import { Component, DoCheck, OnDestroy } from '@angular/core';
import { LuxInputAcComponent } from '../../../modules/lux-form/lux-input-ac/lux-input-ac.component';
import { LuxStorageService } from '../../../modules/lux-util/lux-storage.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-storage-example',
  templateUrl: './storage-example.component.html',
  styleUrls: ['./storage-example.component.scss']
})
export class StorageExampleComponent implements OnDestroy, DoCheck {
  key = 'Storage_Example_Key';
  value: string | null = '';
  sensitive = false;

  value$: Observable<string | null>;
  valueSubscription: Subscription;

  localStorage = localStorage;
  storageLength = 0;

  constructor(public luxStorageService: LuxStorageService) {
    this.value$ = this.luxStorageService.getItemAsObservable(this.key);

    this.valueSubscription = this.value$.subscribe(newValue => {
      this.value = newValue;
    });
  }

  ngDoCheck() {
    if (this.localStorage.length !== this.storageLength) {
      this.storageLength = this.localStorage.length;
    }
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

  updateExisting(key: string, luxInput: LuxInputAcComponent) {
    if(!luxInput.luxValue) {
      throw Error('Null is not allowed!');
    }

    this.luxStorageService.setItem(key, luxInput.luxValue, false);
    luxInput.luxValue = '';
  }

  submit() {
    this.luxStorageService.setItem(this.key, this.value ? this.value : '', this.sensitive);
    this.key = '';
    this.value = '';
    this.sensitive = false;
  }

  clearAll() {
    this.luxStorageService.clearAll();
    this.value = '';
    this.value$ = this.luxStorageService.getItemAsObservable(this.key);
  }

  clearSensitiveItems() {
    this.luxStorageService.clearSensitiveItems();
    this.value = '';
    this.value$ = this.luxStorageService.getItemAsObservable(this.key);
  }
}
