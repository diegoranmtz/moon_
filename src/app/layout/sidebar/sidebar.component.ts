import { Component, OnInit } from '@angular/core';
import { PaginaService } from 'src/shared/services/pagina.service';
import { Pagina } from 'src/shared/models/pagina';
import { SidebarService } from 'src/shared/services/sidebar.service';

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
  constructor(
    private paginaService: PaginaService,
    public sidebarService: SidebarService
  ) {}
  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
    this.selectPaginas(this.usuario);
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
  selectPaginasComplete(){
    const obj ={};
    this.paginas.forEach(x => {
      if(obj[x.paginaKey] === undefined)
        obj[x.paginaKey] = [];
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
