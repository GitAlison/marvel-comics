
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SiteModule } from './site/site.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParamsHttpMarvelInterceptor } from './interceptors/marvel.interceptor';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SiteModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ParamsHttpMarvelInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
