import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidemenuService {
  sidemenuSubject = new Subject();
  sidemenuSubject$ = this.sidemenuSubject.asObservable();
  constructor() { }

  setSidemenuState(state: any) {
    this.sidemenuSubject.next(state);
  }
}
