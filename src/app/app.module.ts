import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/http.interceptor';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { accountPageModule } from './account/account.module';
import { loginPageModule } from './login/login.module';
import { WelcomePageModule } from './welcome/welcome.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, accountPageModule, HttpClientModule, loginPageModule, WelcomePageModule],
  providers: [
    //  {
    //    provide: RouteReuseStrategy,
    //    useClass: IonicRouteStrategy
    //  },
    {
    provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})

export class AppModule { }
