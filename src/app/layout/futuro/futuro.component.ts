import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { MonederoService } from 'src/shared/services/monedero.service';
import { PaginaService } from 'src/shared/services/pagina.service';
import { PrecioService } from 'src/shared/services/precio.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-futuro',
  templateUrl: './futuro.component.html',
  styleUrls: ['./futuro.component.scss']
})
export class FuturoComponent implements OnInit {
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  months = [{ value: 0, name: 'Enero' }, { value: 1, name: 'Febrero' }, { value: 2, name: 'Marzo' }, { value: 3, name: 'Abril' }, { value: 4, name: 'Mayo' }, { value: 5, name: 'Junio' }, { value: 6, name: 'Julio' }, { value: 7, name: 'Agosto' }, { value: 8, name: 'Septiembre' }, { value: 9, name: 'Octubre' }, { value: 10, name: 'Noviembre' }, { value: 11, name: 'Diciembre' }];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Valor de tu cuenta actualmente' },
    { data: [], label: 'Valor a futuro' }
  ];

  title: string = '6 meses';
  monthsLabel: any[] = [];
  yearLabel = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  yearFiveLabel: any[] = [];
  monederos: any[];
  paginas: any[];
  usuario: string;
  total = 0;
  observablePrecios = [];
  precioLast = {};
  futuroTotal: number = 0;
  totalPercent: number = 0;

  constructor(
    private monederoService: MonederoService,
    private paginaService: PaginaService,
    private precioService: PrecioService
  ){}
  ngOnInit(){
    this.usuario = localStorage.getItem('usuario');
    this.createLabels();
    this.selectMonederos();
  }

  selectMonederos(){
    this.monederoService.selectItems().subscribe(
      (data) => { this.monederos = data.monederos },
      (error) => {alert('Ha ocurrido un error')},
      ()=> { this.selectPaginas(this.usuario) });
  }
  selectPaginas(usuario: string){
    this.paginaService.selectItem_usuario({ usuario: usuario }).subscribe(
      (data)=>{ this.paginas = data.acion },
      (error) => {alert('Ha ocurrido un error')},
      ()=> { this.selectPaginasComplete() })
  }

  createLabels(){
    this.getMonths();
    this.getFiveYear();
    this.barChartLabels = this.monthsLabel;
  }
  getMonths(){
    const month = new Date().getMonth();
    let loquesea = 0;
    for(let i = month; i < month + 6; i++) {
      loquesea = i;
      if(i > 11)
        loquesea = i - 12;
      this.monthsLabel.push(this.months.find(x => x.value === loquesea).name);
    }
  }
  getFiveYear() {
    const year = new Date().getFullYear();
    for(let i = year; i < year + 5; i++)
      this.yearFiveLabel.push(i.toString());
  }
  onclickChangeCharts(chart){
    this.barChartLabels = [];
    if(chart === 6) {
      this.title = '6 meses';
      this.barChartLabels = this.monthsLabel;
    }
    else if(chart === 1) {
      this.title = '1 año';
      this.barChartLabels = this.yearLabel;
    }
    else if(chart === 5) {
      this.title = '5 años';
      this.barChartLabels = this.yearFiveLabel;
    }
  }
  selectPaginasComplete(){
    if(this.paginas.length === 0)
      return alert('¡Agrege acciones!');
    this.paginas.forEach(x => {
      this.total = this.total + (+x.precioBuy * +x.cantidad);
      this.observablePrecios.push(this.selectPrecio_Last({accionKey: x.accionKey}));
    });
    this.barChartData[0].data = [];
    for(let i = 0; i< 12; i++)
      this.barChartData[0].data.push(this.total);
    this.selectPrecio_LastForkJoin(this.observablePrecios);
  }
  calculatePercent() {
    /*
      precio de la acción actual: 200
      precio de compra de la accion: 100
      precio de costo promedio: 200 / 2  = (total de precio de acciones) / (cantidad)
      ((200 - 100) / 100) * 100 = 100% de ganancia
      precio de la acción actual: 100
      precio de compra de la accion: 200
      precio de costo promedio: 200 / 1  = (total de precio de acciones) / (cantidad)
      ((100 - 200) / 200) * 100 = -50% de ganancia
    */
    let totalPercent = 0;
    let monthPercent = 0;
    if(this.paginas.length === 0)
      return;
    this.paginas.forEach(x => {
      totalPercent = totalPercent + ((this.precioLast[x.accionKey] - x.precioBuy) / x.precioBuy);
    });
    totalPercent = totalPercent / this.paginas.length;
    this.totalPercent = totalPercent;
    monthPercent = this.totalPercent/6;
    for(let i = 1; i<7; i++)
      this.barChartData[1].data.push((this.total * (totalPercent * i)) + this.total);
  }
  selectPrecio_Last(item){
    return this.precioService.selectItem_accionKey_Last(item);
  }
  selectPrecio_LastForkJoin(observable){
    forkJoin(observable).subscribe(
      (data) => { this.selectPrecio_LastForkJoinComplete(data) },
      (error) => { alert('Ha ocurrido un error') });
  }
  selectPrecio_LastForkJoinComplete(data) {
    data.forEach(x => { this.precioLast[x.acion[0].accionKey] = x.acion[0].lastPrecio });
    this.calculatePercent();
  }
}
