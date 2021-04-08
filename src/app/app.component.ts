import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  data$: Observable<any>;

  constructor(private http: HttpClient, private router: Router,) { }

  ngOnInit() {
    let userDetails: any = localStorage.getItem('userDetails');
    userDetails = userDetails ? JSON.parse(userDetails) : undefined;
    // if (userDetails) {
    //   this.router.navigate(['welcome']);
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }
}