import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

// @Injectable({providedIn: "root"})
@Injectable()
export class UsersService {


    activeUsers = ['Max', 'Anna'];
    inactiveUsers = ['Chris', 'Manu'];

    counter: {value: number}


constructor(private counterService: CounterService) { ///inject de um service dentro de outro service...
    this.counter = this.counterService.counter;
}





onSetToInactive(id: number) {
    this.counter.value = this.counter.value + 1;
    console.log(this.counterService.counter);
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);

  }

  onSetToActive(id: number) {
    this.counter.value = this.counter.value + 1;
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
  }



}