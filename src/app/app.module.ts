import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DatePipe} from "@angular/common";
import { AppComponent } from './app.component';
import { PregledPacijenataComponent } from './pregled-pacijenata/pregled-pacijenata.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {FormsModule} from "@angular/forms";
import { PovijestBolestComponent } from './povijest-bolest/povijest-bolest.component';
import { AdminComponent } from './admin/admin.component';
import {TableComponent} from "./shared/components/table/table.component";
import {FilterComponent} from "./shared/components/filter/filter.component";
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pregledPacijenata', component: PregledPacijenataComponent },
  { path: 'pregledPacijenata/:id', component: PovijestBolestComponent },
  { path: 'admin', component: AdminComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    PregledPacijenataComponent,
    HomeComponent,
    PovijestBolestComponent,
    AdminComponent,
    TableComponent,
   FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //add datepipe

    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
