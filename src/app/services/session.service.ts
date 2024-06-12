import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import {Observable, Subscription} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  userkey:string = 'user';
  constructor(private localStorage: StorageMap) { }

  setSessionData(data: any): Observable<any> {
    return this.localStorage.set(this.userkey, data)
  }

  getSessionData(): Observable<any> {
    return this.localStorage.get(this.userkey);
  }

  removeSessionData(): Subscription {
    return this.localStorage.delete(this.userkey).subscribe(() => {});
  }

  hasSessionData(): Observable<boolean> {
    return this.localStorage.has(this.userkey);
  }
}
