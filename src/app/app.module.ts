import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GeneralComponent } from './components/general/general.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { TableroMandoComponent } from './components/tablero-mando/tablero-mando.component';
import { PerformansComponent } from './components/performans/performans.component';
import { ChartComponent } from './chart/chart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    GeneralComponent,
    IndicadoresComponent,
    TableroMandoComponent,
    PerformansComponent,
    ChartComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
