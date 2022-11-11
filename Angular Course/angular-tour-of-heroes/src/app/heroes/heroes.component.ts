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
  selectedHero?: Hero; // ?: means that the property is optional

  constructor(private heroService: HeroService, private messageService: MessageService) { 

  }


  // ngOnInit is a lifecycle hook. Angular calls ngOnInit shortly after creating a component. It's a good place to put initialization logic.
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
}
// A component is basically a class tha controls a view template.