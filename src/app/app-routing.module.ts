import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './components/general/general.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { TableroMandoComponent } from './components/tablero-mando/tablero-mando.component';
import { PerformansComponent } from './components/performans/performans.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: GeneralComponent },
  { path: 'indicadores', component: IndicadoresComponent },
  { path: 'tablero-mando', component: TableroMandoComponent },
  { path: 'performans', component: PerformansComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }