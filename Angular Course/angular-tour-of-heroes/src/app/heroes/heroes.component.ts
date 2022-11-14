import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; // Import the Hero interface that is in app folder
// import { HEROES } from '../mock-heroes'; // Import the HEROES array that is in app folder
import { HeroService } from '../hero.service'; // Import the HeroService that is in app folder
import { MessageService } from '../message.service'; // Import the MessageService that is in app folder


// The @Component decorator identifies the class immediately. Provide metadata about the component, allowing Angular to associate it with other parts of your application that are relevant.
@Component({
  selector: 'app-heroes', // css element selector
  templateUrl: './heroes.component.html', // location of component's template file
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit { // If we do not export the class, we cannot use it in other files.

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { 

  }


  // ngOnInit is a lifecycle hook. Angular calls ngOnInit shortly after creating a component. It's a good place to put initialization logic.
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
// A component is basically a class tha controls a view template.