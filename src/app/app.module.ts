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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    GeneralComponent,
    IndicadoresComponent,
    TableroMandoComponent,
    PerformansComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
