import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateTimeService {

  constructor() { }

  convertTime(date) {
    const userTime: any = new Date(date);
    const currentDate: any = new Date();
    const seconds = Math.floor((currentDate - userTime) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' years';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
  }
}
