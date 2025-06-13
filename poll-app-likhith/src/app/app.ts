import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PollComponent } from './poll/poll.component';
import { AppComponent } from "./app.component";

@Component({
  selector: 'app-root',
  imports: [PollComponent, AppComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'poll-app-likhith';
}
