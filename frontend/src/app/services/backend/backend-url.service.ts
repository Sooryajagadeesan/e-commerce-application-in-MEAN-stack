import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class BackendURLService {
  // backend api URL can be referenced from here
  private backendURL = environment.backend;
  constructor() { }

  // getter to get the backend URL
  getBackendURL() {
    return this.backendURL;
  }
}
