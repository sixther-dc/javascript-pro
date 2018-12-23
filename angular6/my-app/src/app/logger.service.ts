import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class LoggerService {

  constructor(
    private enable: boolean
  ) { }

  log(message: any) {
    if (this.enable) {
      console.log(message);
    }
  }
}
