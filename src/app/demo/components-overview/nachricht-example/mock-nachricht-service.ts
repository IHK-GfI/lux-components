import { NachrichtService } from '../../../modules/lux-nachricht/lux-nachricht-services/lux-nachricht.service';
import { mockIhkResult, mockNachrichtResult } from './mock-result';
import { of } from 'rxjs';
import { Nachricht, SaveNachrichtResult } from '../../../modules/lux-nachricht/lux-nachricht-model/lux-nachricht-model';

export class MockLuxNachrichtService extends NachrichtService {  
    
    readNachrichten() {
        console.log('GET MOCK NACHRICHTEN');
        return of(mockNachrichtResult);
    }


    createNachricht(entry: Nachricht) {
        console.log('CREATE');
        mockNachrichtResult.push(entry);
        return of(new SaveNachrichtResult(entry, false));
    }

    updateNachricht(entry: Nachricht) {
        console.log('UPDATE');
        return of(new SaveNachrichtResult(entry, false));
    }


    deleteNachricht(id: Number) {
        console.log('DELETE');
        return of(mockNachrichtResult);
    }

    getAuthorizedIhksForUser() {
        console.log('GET MOCK IHKs');
        return of(mockIhkResult);
    }

}