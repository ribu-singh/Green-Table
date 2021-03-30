import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  data$: Observable<any>;

  constructor(private http: HttpClient) {
    this.data$ = http.get('https://my-json-server.typicode.com/typicode/demo/posts');
  }
}