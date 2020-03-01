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


const routes: Routes = [
  {path: 'app',
  component: LayoutComponent,
  children: [
    { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', component: DashboardComponent }
  ]}
];

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    SideBarComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    AngularMaterialModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
