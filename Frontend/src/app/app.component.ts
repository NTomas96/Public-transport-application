import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uniproj33';
  links = [
    { href: "test", name: "Pocetna", icon: "home" },
    { href: "test2", name: "Linije", icon: "map" },
    { href: "test3", name: "Kontakt", icon: "call" },
  ]
}
