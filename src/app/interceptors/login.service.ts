import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  getAuthToken(): string {
    return "TOKEN-ABCDEFG";
  }

}