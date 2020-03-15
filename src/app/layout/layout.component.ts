import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PrecioService } from 'src/shared/services/precio.service';
import { AccionService } from 'src/shared/services/accion.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy{
   public pushRightClass: string;
   accions: any;
   accionsKey: any = [];
   lastPrecio = {};

   constructor(
     private router: Router,
     private precioService: PrecioService,
     private accionService: AccionService
   ) {}

   ngOnInit() {
     this.pushRightClass = 'push-right';
     this.selectAccions();
   }
   ngOnDestroy(){
     clearInterval();
   }
   onclickMenu() {
     this.toggleSidebar(this.pushRightClass);
  }

  toggleSidebar(classPushed){
    const dom: any = document.querySelector('body');
    dom.classList.toggle(classPushed);
    dom.classList.toggle('transAnimacion');
    dom.classList.toggle('bounceAnimacion');
  }
  onLoggedout(){
    localStorage.clear();
    return this.router.navigate(['login']);
  }
  insertPrecioForkJoin(observable){
    forkJoin(observable).subscribe(
      (data) => { this.insertPrecioForkJoinComplete() },
      (error) => {alert('Ha ocurrido un error')});
  }
  insertPrecio(item){
    return this.precioService.insertItem(item);
  }
  selectItem_accionKey_Last(item){
    return this.precioService.selectItem_accionKey_Last(item);
  }
  selectItem_accionKey_LastForkJoin(observable){
    forkJoin(observable).subscribe(
    (data) => { this.selectItem_accionKey_LastForkJoinComplete(data) },
    (error) => {alert('Ha ocurrido un error')});
  }
  selectAccions(){
    this.accionService.selectItems(null).subscribe(
      (data)=> { this.accions = data.acion},
      (error) => {alert('Ha ocurrido un error')},
      () => { this.selectAccionsComplete() });
  }
  selectAccionsComplete() {
    const observable = [];
    this.accionsKey = [];
    this.accions.forEach(x =>{ this.accionsKey.push(x.name) });
    this.accionsKey.forEach(x => { observable.push(this.selectItem_accionKey_Last({accionKey: x }))});
    this.selectItem_accionKey_LastForkJoin(observable);
  }
  insertItems() {
    const observable = [];
    let number: number = 0;
    this.accionsKey.forEach(x => {
      if(this.lastPrecio[x]) {
        number = +(+this.lastPrecio[x].index + 1);
        observable.push(this.insertPrecio({
          index: number,
          accionKey: x,
          precio: this.calculatePrecio(+this.lastPrecio[x].precio + 5, this.lastPrecio[x].precio - 5),
          lastPrecio: this.lastPrecio[x].precio}));
      }

    })
    //this.insertPrecioForkJoin(observable);
  }
  selectItem_accionKey_LastForkJoinComplete(data) {
    this.lastPrecio = {};
    data.forEach(x => {
      if(x.acion.length > 0)
        this.lastPrecio[x.acion[0].accionKey] = {
          index: +x.acion[0].index,
          precio: +x.acion[0].precio
        };
    });
    console.log(this.lastPrecio);
    this.insertItems();
  }
  calculatePrecio(max, min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async insertPrecioForkJoinComplete(){
    let usuario = localStorage.getItem('usuario');
    if(usuario){
      await this.wait(10000);
      this.selectAccions();
    }
  }
  wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
  }
}
