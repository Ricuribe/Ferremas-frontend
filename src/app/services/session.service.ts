import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import {Observable, Subscription} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private localStorage: StorageMap) { }

  setSessionData(key: string, data: any): Subscription {
    return this.localStorage.set(key, data).subscribe(() => {});
  }

  getSessionData(key: string): Observable<any> {
    return this.localStorage.get(key);
  }

  removeSessionData(key: string): Subscription {
    return this.localStorage.delete(key).subscribe(() => {});
  }

  hasSessionData(key: string): Observable<boolean> {
    return this.localStorage.has(key);
  }

}
