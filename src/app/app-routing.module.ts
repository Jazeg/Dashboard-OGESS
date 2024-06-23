import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './components/general/general.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { TableroMandoComponent } from './components/tablero-mando/tablero-mando.component';
import { PerformansComponent } from './components/performans/performans.component';

const routes: Routes = [
  { path: 'dashboard', component: GeneralComponent },
  { path: 'indicadores', component: IndicadoresComponent },
  { path: 'tablero-mando', component: TableroMandoComponent },
  { path: 'performans', component: PerformansComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }