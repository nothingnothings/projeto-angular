import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' }) ///fazer provide desse dummy service DE FORMA 'APP-WIDE' (tanto a modules normais como LAZILY-LOADED)...
@Injectable()
export class LoggingService {
  lastLog: string;

  printLog(message: string) {
    // console.log(message);
    // console.log(this.lastLog);
    this.lastLog = message;
  }
}
