import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

/** Components */
import { AppComponent } from './app.component';
import { HeroesComponent, HeroesFilterComponent, HeroListComponent } from './heroes/components';

/** Services */
import { HttpInterceptorService } from './api/http-interceptor.service';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    HeroesFilterComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
