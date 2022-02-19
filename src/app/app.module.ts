import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  HeroesComponent,
  HeroListComponent,
  HeroesFilterComponent,
  PageNotFoundComponent
} from './components';
import { MaterialAngularModule } from './shared/modules/material-angular.module';

@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    HeroesFilterComponent,
    HeroesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
