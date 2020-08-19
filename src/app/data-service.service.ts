import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  data1 = new BehaviorSubject([]);
  data1$ = this.data1.asObservable();
  constructor() { }
}
