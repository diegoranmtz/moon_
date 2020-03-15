import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaginaService } from 'src/shared/services/pagina.service';
import { SidebarService } from 'src/shared/services/sidebar.service';
import { PrecioService } from 'src/shared/services/precio.service';

@Component({
  selector: 'app-monedero',
  templateUrl: './monedero.component.html',
  styleUrls: ['./monedero.component.scss']
})
export class MonederoComponent implements OnInit{
  usuario: string;
  accionKey: string;
  total: number = 0;
  form: FormGroup;
  item: any;
  plusMinus: number = 0;
  precioLast: any;

  constructor(
    private route: ActivatedRoute,
    private paginaService: PaginaService,
    private formBuilder: FormBuilder,
    private sidebarService: SidebarService,
    private router: Router,
    private precioService: PrecioService
  ){ }
  ngOnInit() {
    this.createForm();
    this.usuario = localStorage.getItem('usuario');
    this.route.params.subscribe( paramMap => {
      this.accionKey = paramMap['accionKey'];
      this.selectItem({ usuario: this.usuario, accionKey: this.accionKey });
    });
  }
  onSubmit(){
    if (!this.form.valid)
      return;
    if (!this.form.dirty)
      return alert('Cambie los valores.');
    this.item.cantidad = null;
    this.item.precioBuy = null;
    const mergedItem = { ...this.item, ...this.form.value };
    this.updateItem(mergedItem);
  }

  selectItem(item: {usuario: string, accionKey: string}){
    this.paginaService.selectItem_Usuario_AccionKey(item).subscribe(
      (data) => { this.item = data.acion[0] },
      (error) => { alert('Ha ocurrido un error') },
      () => { this.selectItemsComplete()});
  }
  updateItem(item) {
    this.paginaService.updateItem(item).subscribe(
      ()=>{ this.updateItemComplete()},
      (error)=>{ alert('Ha ocurrido un error') });
  }
  deleteItem(id){
    this.paginaService.deleteItem(id).subscribe(
      () =>{ this.deleteItemComplete() },
      (error)=>{ alert('Ha ocurrido un error') });
  }

  createForm() {
    this.form = this.formBuilder.group({
      precioBuy: ['', [Validators.required, Validators.min(1)]],
      cantidad: ['', [Validators.required,  Validators.min(1)]]
    });
  }
  selectItemsComplete(){
    if(!this.item)
      return this.router.navigate(['/app/dashboard']);
    this.form.get('precioBuy').setValue(this.item.precioBuy);
    this.form.get('cantidad').setValue(this.item.cantidad);
    this.total = +this.item.precioBuy * +this.item.cantidad;
    this.selectLastPrecio({ accionKey: this.accionKey });
  }
  updateItemComplete(){
    alert('Guardado con éxito.');
    this.selectItem({ usuario: this.usuario, accionKey: this.accionKey });
  }
  deleteItemComplete(){
    alert('Vendido con éxito. Has ' + (this.plusMinus < 0 ? ('perdido ' + this.plusMinus) : ('ganado ' + this.plusMinus)) + ' pesos.');

    this.sidebarService.updateSidebar();
    this.router.navigate(['/app/dashboard']);
  }
  onclickDeleteItem(){
    this.deleteItem(this.item._id);
  }
  changeSidebar(){
    this.sidebarService.updateSidebar();
  }
  selectLastPrecio(item) {
    this.precioService.selectItem_accionKey_Last(item).subscribe(
      (data) => {this.precioLast = data.acion[0]},
      (error)=>{ alert('Ha ocurrido un error') },
      ()=> { this.selectLastPrecioComplete() });
  }
  selectLastPrecioComplete() {
    this.plusMinus = (this.precioLast.precio - this.item.precioBuy) * +this.item.cantidad;
  }
}
