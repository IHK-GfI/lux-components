import { NachrichtService } from '../../../modules/lux-nachricht/lux-nachricht-services/lux-nachricht.service';
import { mockIhkResult, mockNachrichtResult } from './mock-result';
import { of } from 'rxjs';
import { Nachricht, SaveNachrichtResult } from '../../../modules/lux-nachricht/lux-nachricht-model/lux-nachricht-model';
import { Injectable } from '@angular/core';

@Injectable()
export class MockLuxNachrichtService extends NachrichtService {
    id = mockNachrichtResult.length;

    constructor() {
      super(null, null);
    }

    readNachrichten() {
        return of([...mockNachrichtResult]);
    }

    createNachricht(entry: Nachricht) {
        entry.id = this.id++;
        return of(new SaveNachrichtResult(entry, false));
    }

    updateNachricht(entry: Nachricht) {
        return of(new SaveNachrichtResult(entry, false));
    }

    deleteNachricht(id: Number) {
        return of(null);
    }

    getAuthorizedIhksForUser() {
        return of(mockIhkResult);
    }

}
