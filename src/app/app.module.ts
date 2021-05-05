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
import { Camera } from '@ionic-native/camera/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { PopoverContentModule } from './components/popover-content-page/popover-content.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, accountPageModule, loginPageModule, PopoverContentModule, WelcomePageModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule],
  providers: [{
    provide: RouteReuseStrategy, useClass: IonicRouteStrategy,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, GooglePlus, Camera, StatusBar, SplashScreen],
  bootstrap: [AppComponent],
})

export class AppModule { }
