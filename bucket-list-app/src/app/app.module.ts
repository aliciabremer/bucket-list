import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { StartModule } from './start/start.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { HeaderModule } from './header/header.module';
import { MatchModule } from './match/match.module';


import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    RouterModule,
    StartModule,
    LoginModule,
    SignupModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderModule,
    MatchModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private readonly router: Router,
  ) {
    router.events
      .subscribe(console.log)
  }
}
