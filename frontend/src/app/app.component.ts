import { BackendURLService } from './services/backend/backend-url.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (public backend:BackendURLService) {
  }
}
