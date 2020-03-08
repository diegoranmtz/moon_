import { Component, OnInit } from '@angular/core';
import { PaginaService } from 'src/shared/services/pagina.service';
import { UsuarioService } from 'src/shared/services/usuario.service';
import { MonederoService } from 'src/shared/services/monedero.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  total: number = 0;
  paginas: any = [];
  usuario: string;
  usuarioName: string;
  nombre: string = '';
  inversion: string = '';
  monederos: any;

  constructor(
    private paginaService: PaginaService,
    private usuarioService: UsuarioService,
    private monederoService: MonederoService
  ) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
    this.selectMonederos();
    this.selectUsuario({ account: this.usuario });
  }

  selectPaginas(usuario: string){
    this.paginaService.selectItem_usuario({ usuario: usuario }).subscribe(
      (data)=>{ this.paginas = data.acion },
      (error) => {alert('Ha ocurrido un error')},
      ()=> { this.selectPaginasComplete() })
  }
  selectPaginasComplete(){
    if(this.paginas.length === 0)
      return alert('¡Agrege acciones!');
    this.paginas.forEach(x => { this.total = this.total + (+x.precioBuy * +x.cantidad) });
    this.calculateBestInversion();
  }
  selectUsuario(item){
    this.usuarioService.selectItem(item).subscribe(
      (data) => {  this.usuarioName = data.acion[0].name },
      (error) => { alert('Ha ocurrido un error') });
  }
  selectMonederos(){
    this.monederoService.selectItems().subscribe(
      (data) => { this.monederos = data.monederos },
      (error) => {alert('Ha ocurrido un error')},
      ()=> { this.selectPaginas(this.usuario) });
  }
  calculateBestInversion() {
    const obj ={};
    this.paginas.forEach(x => {
      if(obj[x.paginaKey] === undefined)
        obj[x.paginaKey] = [];
      obj[x.paginaKey].push(+x.cantidad * +x.precioBuy);
    });
    console.log(obj);
    const obj1 = { };
    for (var k in obj) {
      obj1[k] = 0;
      obj[k].forEach(x =>{
        obj1[k] = obj1[k] + x;
      });
    }
    const max = Math.max.apply(null, Object.values(obj1));
    this.inversion = this.monederos.find(x => x.paginaKey === this.getKeyByValue(obj1, max)).name;
  }
  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
}
