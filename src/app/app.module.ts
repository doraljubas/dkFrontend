import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PregledPacijenataComponent } from './pregled-pacijenata/pregled-pacijenata.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'pregledPacijenata', component: PregledPacijenataComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    PregledPacijenataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
