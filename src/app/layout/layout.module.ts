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
    SideBarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
