import { Component } from '@angular/core';

@Component({ // decorator allows us to add metadata to our class
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
