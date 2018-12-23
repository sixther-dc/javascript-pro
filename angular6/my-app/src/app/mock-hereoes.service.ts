import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { Observable, of } from 'rxjs';

export class MockHeroService {
    heros: Hero[] = HEROES

    getHeroes(): Observable<Hero[]> {
        return of(this.heros);
      }
}