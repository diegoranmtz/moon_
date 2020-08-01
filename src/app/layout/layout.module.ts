import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { ChartComponent } from './dashboard/charts/chart.component';
import { ChartsModule } from 'ng2-charts';
import { PaginaComponent } from './pagina/pagina.component';
import { MonederoService } from 'src/shared/services/monedero.service';
import { AccionService } from 'src/shared/services/accion.service';
import { PaginaService } from 'src/shared/services/pagina.service';
import { SidebarService } from 'src/shared/services/sidebar.service';
import { AccionComponent } from './accion/accion.component';
import { MonederoComponent } from './monedero/monedero.component';
import { PrecioService } from 'src/shared/services/precio.service';
import { FuturoComponent } from './futuro/futuro.component';
import { FormUploadComponent } from './photo/photo.component';
import { ViewFormUploadComponent } from './photo/viewPhoto.component';


const routes: Routes = [
  {path: 'app',
  component: LayoutComponent,
  children: [
    { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'pagina', component: PaginaComponent },
    { path: 'accion/:paginaKey', component: AccionComponent },
    { path: 'monedero/:accionKey', component: MonederoComponent },
    { path: 'futuro', component: FuturoComponent },
    { path: 'addDocument', component: FormUploadComponent },
    { path: 'showDocument', component: ViewFormUploadComponent },
    { path: '**', component: DashboardComponent }
  ]}
];

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    SideBarComponent,
    ChartComponent,
    PaginaComponent,
    AccionComponent,
    MonederoComponent,
    FuturoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    AngularMaterialModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MonederoService,
    AccionService,
    PaginaService,
    SidebarService,
    PrecioService
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
