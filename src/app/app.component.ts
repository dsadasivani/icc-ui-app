import { Component, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  active: string = '';

  ngAfterViewInit(): void {
    Feather.replace();
  }

  setActive(active: string): void {
    this.active = active;
  }
}
