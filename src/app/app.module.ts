import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CityInputComponent } from './city-input/city-input.component';
import { CurrentInfoComponent } from './current-info/current-info.component';

@NgModule({
  declarations: [
    AppComponent,
    CityInputComponent,
    CurrentInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
