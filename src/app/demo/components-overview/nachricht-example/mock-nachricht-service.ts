import { NachrichtService } from '../../../modules/lux-nachricht/lux-nachricht-services/lux-nachricht.service';
import { mockIhkResult, mockNachrichtResult } from './mock-result';
import { of } from 'rxjs';
import { Nachricht, SaveNachrichtResult } from '../../../modules/lux-nachricht/lux-nachricht-model/lux-nachricht-model';

export class MockLuxNachrichtService extends NachrichtService {
    readNachrichten() {
        return of(mockNachrichtResult);
    }

    createNachricht(entry: Nachricht) {
        mockNachrichtResult.push(entry);
        return of(new SaveNachrichtResult(entry, false));
    }

    updateNachricht(entry: Nachricht) {
        return of(new SaveNachrichtResult(entry, false));
    }


    deleteNachricht(id: Number) {
        return of(mockNachrichtResult);
    }

    getAuthorizedIhksForUser() {
        return of(mockIhkResult);
    }

}
