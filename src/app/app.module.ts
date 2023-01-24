import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MultiselectComponent} from "./multiselect/multiselect.component";
import {MultiselectOptionComponent} from "./multiselect/option/multiselect-option.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MultiselectComponent,
    MultiselectOptionComponent,
    ReactiveFormsModule,
    CdkConnectedOverlay,
    CdkOverlayOrigin
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
