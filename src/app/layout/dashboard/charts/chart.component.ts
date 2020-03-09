import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { PrecioService } from 'src/shared/services/precio.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit{
  @Input('usuario') usuario: string;
  @Input('accionKey') accionKey: string;

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: this.accionKey }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  precios: any;

  constructor(
    private precioService: PrecioService
  ) { }
  ngOnInit() {
    this.selectPrecio_LastSeven({accionKey: this.accionKey});
  }

  public randomize() {
    this.chart.update();
  }

  selectPrecio_LastSeven(item) {
    this.precioService.selectItem_accionKey_LastSeven(item).subscribe(
      (data) => { this.precios = data.acion },
      (error) => {alert('Ha ocurrido un error')},
      () => { this.selectPrecio_LastSevenComplete() });
  }
  selectPrecio_LastSevenComplete() {
    let data = [];
    this.lineChartData[0].data = [];
    this.lineChartData[0].label = this.accionKey;
    this.precios = this.precios.sort((a, b) => Number(a.index) - Number(b.index));
    this.precios.forEach(x => { data.push(x.precio) });
    this.lineChartData[0].data = data;
    this.chart.update();
    this.setNewData();
  }
  async setNewData(){
    let usuario = localStorage.getItem('usuario');
    if(usuario){
      await this.wait(10000);
      this.selectPrecio_LastSeven({accionKey: this.accionKey});
    }
  }
  wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
  }
}
