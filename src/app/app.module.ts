import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GeneralComponent } from './components/general/general.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { TableroMandoComponent } from './components/tablero-mando/tablero-mando.component';
import { PerformansComponent } from './components/performans/performans.component';
import { ChartComponent } from './chart/chart.component';
import { FooterComponent } from './footer/footer.component';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
