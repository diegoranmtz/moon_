import { Component, OnInit } from '@angular/core';
import { PaginaService } from 'src/shared/services/pagina.service';
import { Pagina } from 'src/shared/models/pagina';
import { SidebarService } from 'src/shared/services/sidebar.service';
import { MonederoService } from 'src/shared/services/monedero.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit {
  public showMenu: string;
  public paginas: Pagina[];
  paginaMenu = [];
  usuario: string;
  monederos: any;

  constructor(
    private paginaService: PaginaService,
    public sidebarService: SidebarService,
    private monederoService: MonederoService
  ) {}
  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
    this.selectMonederos();
    this.subscribeChange();
  }

  addExpandClass(element: string) {
    if (element === this.showMenu)
      this.showMenu = '';
    else
      this.showMenu = element;
  }

  selectPaginas(usuario: string){
    this.paginaService.selectItem_usuario({ usuario: usuario }).subscribe(
      (data)=>{ this.paginas = data.acion },
      (error) => {alert('Ha ocurrido un error')},
      ()=> { this.selectPaginasComplete() })
  }
  selectMonederos(){
    this.monederoService.selectItems().subscribe(
      (data) => { this.monederos = data.monederos },
      (error) => { alert('Ha ocurrido un error') },
      () => { this.selectPaginas(this.usuario); });
  }
  selectPaginasComplete(){
    const obj ={};
    this.paginas.forEach(x => {
      if(obj[x.paginaKey] === undefined)
        obj[x.paginaKey] = [];
      x['paginaKeyDisplay'] = this.monederos.find(i => i.paginaKey === x.paginaKey).name;
      obj[x.paginaKey].push(x);
    });

    var keys = [];
    let index = 0;
    for (var k in obj) {
      this.paginaMenu[index] = [];
      keys.push(k);
      index = index + 1;
    }
    for(let i = 0; index > i; i++){
      this.paginaMenu[i].push(obj[keys[i]]);
    }
    console.log(this.paginaMenu)
  }
  subscribeChange(){
    this.sidebarService.getSidebar().subscribe(
      () => { this.changeSidebar()},
      (error) => {alert('Ha ocurrido un error')}
    );
  }
  changeSidebar(){
    this.paginas = [];
    this.paginaMenu = [];
    this.selectPaginas(this.usuario);
  }
}
