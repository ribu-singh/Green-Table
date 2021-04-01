import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token-http-interceptor.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { accountPageModule } from './account/account.module';
import { loginPageModule } from './login/login.module';
import { WelcomePageModule } from './welcome/welcome.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, accountPageModule, loginPageModule, WelcomePageModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule],
  providers: [{
    provide: RouteReuseStrategy, useClass: IonicRouteStrategy,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, GooglePlus],
  bootstrap: [AppComponent],
})

export class AppModule { }
