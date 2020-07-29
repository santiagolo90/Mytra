import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  scrollTo$ = new EventEmitter<any>();
  changeTheme$ = new EventEmitter<any>();

  constructor() { }
}
